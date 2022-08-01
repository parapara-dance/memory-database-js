import { Resource } from './Resource.js'

export class Country extends Resource {
  static $endpoint = '/countries'

  /** @type {boolean} */
  static downloading = true

  /** @type {Array<Country>} */
  static cached = []

  /** @type {Map<id,Country>} */
  static $map = new Map()

  /** @type {Promise<Country>|undefined} */
  static $promise = undefined

  // Data Properties

  // Associations
}
