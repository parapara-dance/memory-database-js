const ENDPOINT_ERROR = new Error('Resource.$endpoint not set')
const API_ERROR = new Error('Resource.$api not set')

/**
 * Vue-friendly Resource class.
 */
export class Resource {
  // =========================== CLASS IMPLEMENTATION ===========================

  /**
   * @type {boolean}
   * @abstract
   */
  static downloading = false

  /**
   * @type {Array<any>}
   * @abstract
   */
  static all = []

  /**
   * @type {Map<id,any>}
   * @abstract
   */
  static $map = new Map()

  /**
   * @type {Promise<any>|undefined}
   * @abstract
   */
  static $promise = undefined

  /**
   * @type {string|undefined}
   * @abstract
   */
  static $endpoint = undefined

  /** @type {ApiClient|undefined} */
  static $api = undefined

  /**
   * The name of the property that holds the parent record.
   *
   * @type {string|undefined}
   */
  static $parentProperty = undefined

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
   * Gets an item already in memory.
   *
   * @param {id} id
   */
  static get (id) {
    return this.$map.get(id)
  }

  /**
   * Same as #get, but downloads data first.
   *
   * @param {id} id
   * @returns {Promise<any>}
   */
  static async find (id) {
    await this.download()
    return this.get(id)
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

  /** @type {id} */
  id = undefined

  /** @type {boolean} */
  _markedForDeletion = false

  /**
   * The endpoint of the instance.
   */
  endpoint () {
    /** @type {any} */
    var klass = this.constructor

    var endpoint = `${klass.$endpoint}/${this.id}`

    if (klass.$parentProperty != null) {
      // @ts-ignore
      var parent = this[klass.$parentProperty]

      if (parent != null) {
        endpoint = `${parent.endpoint()}${endpoint}`
      }
    }

    return endpoint
  }

  upload () {

  }

  /**
   * @param {any} data
   */
  update (data = null) {
    if (data == null) return

    this.id = data.id
  }

  /**
   * Links record with associations.
   */
  async link () {
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
