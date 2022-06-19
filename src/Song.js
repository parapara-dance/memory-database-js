import { Artist } from './Artist.js'
import { Resource } from './Resource.js'

export class Song extends Resource {
  static $endpoint = '/songs'

  /** @type {boolean} */
  static downloading = true

  /** @type {Array<Song>} */
  static all = []

  /** @type {Map<id,Song>} */
  static $map = new Map()

  /** @type {Promise<Song>|undefined} */
  static $promise = undefined

  // Data Properties

  /** @type {string|undefined} */
  title = undefined

  /** @type {string|undefined} */
  titleAlt = undefined

  /** @type {string|undefined} */
  artistId = undefined

  /** @type {string|undefined} */
  genre = undefined

  /** @type {string|undefined} */
  socialMediaQuery = undefined

  /** @type {string|undefined} */
  autocomplete = undefined

  /** @type {number} */
  rating5 = 0

  /** @type {number} */
  rating4 = 0

  /** @type {number} */
  rating3 = 0

  /** @type {number} */
  rating2 = 0

  /** @type {number} */
  rating1 = 0

  /** @type {number} */
  trainingComplete = 0

  /** @type {number} */
  trainingRevisit = 0

  /** @type {number} */
  trainingOngoing = 0

  /** @type {number} */
  trainingWishlist = 0

  /** @type {number} */
  trainingIgnored = 0

  /** @type {string|undefined} */
  createdAt = undefined

  // Associations

  /** @type {Artist|undefined} */
  artist = undefined

  // currentUserStat = undefined

  /** @type {Array<Video>} */
  videos = []

  /**
   * @param {any} data
   */
  update (data = null) {
    if (data == null) return

    super.update(data)

    this.title = data.t
    this.titleAlt = data.ot
    this.artistId = data.art
    this.genre = data.g
    this.socialMediaQuery = data.q

    this.rating5 = data.r5 || 0
    this.rating4 = data.r4 || 0
    this.rating3 = data.r3 || 0
    this.rating2 = data.r2 || 0
    this.rating1 = data.r1 || 0

    this.trainingComplete = data.tC || 0
    this.trainingRevisit = data.tF || 0
    this.trainingOngoing = data.tP || 0
    this.trainingWishlist = data.tW || 0
    this.trainingIgnored = data.tN || 0

    this.createdAt = data.cT

    this.link()
  }

  async link () {
    this.linkArtist()
    this.linkVideos()
  }

  async linkArtist () {
    var artist = this.artist

    if (artist != null) {
      artist.$events.removeListener('update', this.updateAutocomplete, this)
    }

    await Artist.download()
    artist = Artist.get(this.artistId)

    if (artist == null) return

    this.artist = artist
    this.artist.$events.on('update', this.updateAutocomplete, this)

    this.updateAutocomplete()
  }

  async linkVideos () {
    // TODO
  }

  updateAutocomplete () {
    var songTitle

    if (this.titleAlt) {
      songTitle = `${this.title} / ${this.titleAlt}`
    } else {
      songTitle = this.title
    }

    if (this.artist != null) {
      this.autocomplete = `${this.artist.autocomplete} - ${songTitle}`
    } else {
      this.autocomplete = `(NO_ARTIST) - ${songTitle}`
    }
  }
}
