import { Resource } from './Resource.js'

export class Video extends Resource {
  static $endpoint = '/videos'

  /** @type {boolean} */
  static downloading = true

  /** @type {Array<Video>} */
  static all = []

  /** @type {Map<id,Video>} */
  static $map = new Map()

  /** @type {Promise<Video>|undefined} */
  static $promise = undefined

  // Data Properties

  platformId = undefined
  remoteId = undefined
  category = undefined
  description = undefined
  isEditorChoice = false
  createdAt = undefined

  // Associations

  /** @type {Array<VideoSong>} */
  videoSongs = []
}
