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
  static cached = []

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
   * When undefined, item does not have a parent.
   *
   * @type {string|undefined}
   */
  static $parentProperty = undefined

  /**
   * Downloads all records from the API.
   * Returns the cached array.
   *
   * @returns {Promise<Array<object>>}
   */
  static all (force = false) {
    if (this.$endpoint == null) return Promise.reject(ENDPOINT_ERROR)
    if (this.$api == null) return Promise.reject(API_ERROR)

    if (this.$promise != null && !force) return this.$promise

    // Mark the entire collection for deletion.
    // Updated items will be unmarked.
    // Outdated items will be deleted.
    this.cached.forEach(this.markForDeletion)

    this.$promise = this.$api.get(this.$endpoint).then((/** @type {Array<any>} */ itemsFromApi) => {
      itemsFromApi.forEach(this.upsert, this)
      this.prune()
      this.downloading = false
      return this.cached
    })

    this.downloading = true

    // @ts-ignore
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
    this.cache(item)

    return true
  }

  /**
   * Adds an item to the cached collections.
   *
   * @param {Resource} item
   */
  static cache (item) {
    this.$map.set(item.id, item)
    this.cached.push(item)
  }

  /**
   * Gets an item from memory. Does not download data.
   *
   * @param {id} id
   */
  static get (id) {
    return this.$map.get(id)
  }

  /**
   * Same as #get, but downloads data if resource is not cached.
   * If a download happens, the object is not cached.
   *
   * @param {id} id
   * @returns {Promise<any>}
   */
  static async find (id) {
    var object = this.get(id)
    if (object) {
      return object
    }

    object = new this()
    object.id = id

    return await object.download()
  }

  static reset () {
    this.cached = []
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
    this.cached.forEach(this.pruneItem)
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
   * The endpoint of the single resource.
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

  /**
   * Calls the API to download data on a single resource.
   * This method does not add the object to memory.
   */
  async download () {
    if (this.id == null) {
      return null
    }

    /** @type {any} */
    var klass = this.constructor

    var data = await klass.$api.get(this.endpoint())
    this.update(data)

    return this
  }

  async save () {
    //
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
   * Deletes record from cached collections.
   * Subclasses should extend this method to unlink associations.
   */
  implode () {
    /** @type {any} */
    var klass = this.constructor

    klass.$map.delete(this.id)
    klass.cached.splice(klass.cached.indexOf(this), 1)
  }
}
