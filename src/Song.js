import { Artist } from './Artist.js'
import { Resource } from './Resource.js'

export class Song extends Resource {
  static $endpoint = '/songs'

  // Data Properties

  /** @type {string|undefined} */
  title = undefined

  /** @type {string|undefined} */
  titleAlt = undefined

  /** @type {string|undefined} */
  artistId = undefined

  /** @type {string|undefined} */
  autocomplete = undefined

  // Associations

  /** @type {Artist|undefined} */
  artist = undefined

  // currentUserStat = undefined

  /**
   * @param {any} data
   */
  update (data = null) {
    if (data == null) return

    super.update(data)

    this.title = data.t
    this.titleAlt = data.ot
    this.artistId = data.a

    this.link()
  }

  async link () {
    this.linkArtist()
    this.linkVideos()
  }

  async linkArtist () {
    /** @type {Artist|undefined} */
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
