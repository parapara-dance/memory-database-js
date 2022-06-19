import { Resource } from './Resource.js'

export class Platform extends Resource {
  static $endpoint = '/platforms'

  /** @type {boolean} */
  static downloading = true

  /** @type {Array<Platform>} */
  static all = []

  /** @type {Map<id,Platform>} */
  static $map = new Map()

  /** @type {Promise<Platform>|undefined} */
  static $promise = undefined

  // Data Properties

  // Associations
}
