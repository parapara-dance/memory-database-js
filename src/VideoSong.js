import { Resource } from './Resource.js'
import { Video } from './Video.js'

export class VideoSong extends Resource {
  static $endpoint = '/songs' // /video/:id/songs
  static $parentProperty = 'video'

  /** @type {boolean} */
  static downloading = true

  /** @type {Array<VideoSong>} */
  static cached = []

  /** @type {Map<id,VideoSong>} */
  static $map = new Map()

  /**
   * VideoSong does not have an endpoint where it can download data from.
   * Its data comes from downloading Video records.
   *
   * TODO: make a new endpoint for VideoSongs.
   *
   * @returns {Promise<Array<object>>}
   */
  static async download () {
    return await Video.all()
  }

  // Data properties

  /** @type {id|undefined} */
  videoId = undefined

  /** @type {id|undefined} */
  songId = undefined

  /**
   * Start of the song in milliseconds.
   *
   * @type {number|undefined}
   */
  startMs = undefined

  /**
   * End of the song in milliseconds.
   *
   * @type {number|undefined}
   */
  endMs = undefined

  // Associations

  /** @type {Video|undefined} */
  video = undefined

  /** @type {Song|undefined} */
  song = undefined

  /**
   * @param {any} data
   */
  update (data) {
    if (data == null) return

    super.update(data)

    this.videoId = data.vd
    this.songId = data.sng
    this.startMs = data.s
    this.endMs = data.e
  }
}
