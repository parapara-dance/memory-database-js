'use strict'

const ENDPOINT_ERROR = new Error('Resource.$endpoint not set')
const API_ERROR = new Error('Resource.$api not set')

/**
 * Vue-friendly Resource class.
 */
export class Resource {
  // =========================== CLASS IMPLEMENTATION ===========================

  /** @type {boolean} */
  static downloading = true

  /** @type {Array<any>} */
  static all = []

  /** @type {Map<any,any>} */
  static $map = new Map()

  /** @type {Promise<any>|undefined} */
  static $promise = undefined

  /** @type {string|undefined} */
  static $endpoint = undefined

  /** @type {ApiClient|undefined} */
  static $api = undefined

  /**
   * Downloads all records from the API.
   */
  static download (force = false) {
    if (this.$endpoint == null) return Promise.reject(ENDPOINT_ERROR)
    if (this.$api == null) return Promise.reject(API_ERROR)

    if (this.$promise != null && !force) return this.$promise

    // Mark the entire collection for deletion.
    // Updated items will be unmarked.
    // Outdated items will be deleted.
    this.all.forEach(this.markForDeletion)

    this.$promise = this.$api.get(this.$endpoint).then((/** @type {Array<any>} */ itemsFromApi) => {
      itemsFromApi.forEach(this.upsert, this)
      this.prune()
      this.downloading = false
      return this
    })

    this.downloading = true

    return this.$promise
  }

  /**
   * Creates an instance with the given object and adds it to memory.
   * If an object with the given ID already exists, update it.
   *
   * @param {any} itemData
   * @returns {boolean}
   */
  static upsert (itemData) {
    var id = itemData.id
    if (!id) return false

    var existing = this.$map.get(id)
    if (existing) {
      existing.update(itemData)
      existing._markedForDeletion = false
      return true
    }

    var item = new this()
    item.update(itemData)

    this.$map.set(item.id, item)
    this.all.push(item)

    return true
  }

  /**
   * @param {any} id
   */
  static get (id) {
    return this.$map.get(id)
  }

  /**
   * @param {any} id
   */
  static find (id) {
    return this.$map.get(id)
  }

  static reset () {
    this.all = []
    this.$map.clear()
    this.$promise = undefined
    this.downloading = false
  }

  /**
   * @param {any} item
   */
  static markForDeletion (item) {
    item._markedForDeletion = true
  }

  /**
   * Deletes all items marked for deletion.
   */
  static prune () {
    this.all.forEach(this.pruneItem)
  }

  /**
   * @param {any} item
   */
  static pruneItem (item) {
    if (item._markedForDeletion) item.implode()
  }

  // =========================== INSTANCE IMPLEMENTATION ===========================

  id = null
  _markedForDeletion = false

  /**
   *
   * @param {any} data
   * @returns
   */
  update (data = null) {
    if (data == null) return

    this.id = data.id
  }

  /**
   * Links record with associations.
   */
  link () {
    // Should be implemented in subclasses
  }

  /**
   * Deletes record from memory and removes it from collections.
   * Subclasses should extend this method to unlink associations.
   */
  implode () {
    /** @type {any} */
    var klass = this.constructor

    klass.$map.delete(this.id)
    klass.all.splice(klass.all.indexOf(this), 1)
  }
}
