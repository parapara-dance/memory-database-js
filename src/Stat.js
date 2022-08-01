import { Resource } from './Resource.js'

export class Stat extends Resource {
  static $endpoint = '/stats/current'

  /** @type {boolean} */
  static downloading = true

  /** @type {Array<Stat>} */
  static cached = []

  /** @type {Map<id,Stat>} */
  static $map = new Map()

  /** @type {Promise<Stat>|undefined} */
  static $promise = undefined

  // Data Properties

  // Associations
}
