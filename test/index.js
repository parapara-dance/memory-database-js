import { expect } from '@dimensionalpocket/development'

import {
  Artist,
  Country,
  Platform,
  Resource,
  Song,
  Stat,
  Video,
  VideoSong
} from '../index.js'

describe('index', function () {
  it('exports the base resource', function () {
    expect(Resource).to.exist
  })

  it('exports artists', function () {
    expect(Artist).to.exist
  })

  it('exports countries', function () {
    expect(Country).to.exist
  })

  it('exports platforms', function () {
    expect(Platform).to.exist
  })

  it('exports songs', function () {
    expect(Song).to.exist
  })

  it('exports stats', function () {
    expect(Stat).to.exist
  })

  it('exports videos', function () {
    expect(Video).to.exist
  })

  it('exports video songs', function () {
    expect(VideoSong).to.exist
  })
})
