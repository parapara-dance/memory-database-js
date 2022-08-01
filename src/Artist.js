import EventEmitter from 'eventemitter3'
import { Resource } from './Resource.js'

export class Artist extends Resource {
  static $endpoint = '/artists'

  /** @type {boolean} */
  static downloading = true

  /** @type {Array<Artist>} */
  static cached = []

  /** @type {Map<id,Artist>} */
  static $map = new Map()

  /** @type {Promise<Artist>|undefined} */
  static $promise = undefined

  // Data Properties

  /** @type {string|undefined} */
  name = undefined

  /** @type {string|undefined} */
  nameAlt = undefined

  /** @type {string|undefined} */
  autocomplete = undefined

  // Used by songs to watch for autocomplete updates.
  $events = new EventEmitter()

  /**
   * @param {any} data
   */
  update (data = null) {
    if (data == null) return

    super.update(data)

    this.name = data.n
    this.nameAlt = data.on

    if (this.nameAlt != null) {
      this.autocomplete = `${this.name} / ${this.nameAlt}`
    } else {
      this.autocomplete = this.name
    }

    this.$events.emit('update', this)
  }
}
