import { expect } from '@dimensionalpocket/development'
import database from '../index.js'

describe('index', function () {
  it('exports artists', function () {
    expect(database.artists.name).to.eq('Artist')
  })

  it('exports countries', function () {
    expect(database.countries.name).to.eq('Country')
  })

  it('exports platforms', function () {
    expect(database.platforms.name).to.eq('Platform')
  })

  it('exports songs', function () {
    expect(database.songs.name).to.eq('Song')
  })

  it('exports stats', function () {
    expect(database.stats.name).to.eq('Stat')
  })

  it('exports videos', function () {
    expect(database.videos.name).to.eq('Video')
  })

  it('exports video songs', function () {
    expect(database.videoSongs.name).to.eq('VideoSong')
  })
})
