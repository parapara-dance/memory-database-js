import './support/api-mock.js'

// import { expect } from '@dimensionalpocket/development'
import { Song } from '../src/Song.js'
import { itBehavesLikeASubResource } from './shared-examples/it-behaves-like-a-subresource.js'

describe('Song', function () {
  itBehavesLikeASubResource(Song)
})
