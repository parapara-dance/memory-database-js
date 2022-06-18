'use strict'

const ENDPOINT_ERROR = new Error('Resource $endpoint not set')
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

    this.downloading = true

    this.$promise = this.$api.get(this.$endpoint).then((/** @type {Array<any>} */ itemsFromApi) => {
      itemsFromApi.forEach(this.upsert, this)
      this.downloading = false
    })

    return this.$promise
  }

  /**
   * Creates an instance with the given object and add it to memory.
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
      return true
    }

    var item = new this()
    item.update(itemData)

    this.$map.set(item.id, item)
    this.all.push(item)

    return true
  }

  /**
   *
   * @param {any} id
   * @returns
   */
  static get (id) {
    return this.$map.get(id)
  }

  static reset () {
    this.all = []
    this.$map.clear()
    this.$promise = undefined
    this.downloading = false
  }

  // =========================== INSTANCE IMPLEMENTATION ===========================

  id = null

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
   * Rebuilds associations.
   */
  rebuild () {
    // Should be implemented in extensions
  }
}
