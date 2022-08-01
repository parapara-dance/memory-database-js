import './support/api-mock.js'

// import { expect } from '@dimensionalpocket/development'
import { VideoSong } from '../src/VideoSong.js'
import { itBehavesLikeASubResource } from './shared-examples/it-behaves-like-a-subresource.js'

describe('VideoSong', function () {
  itBehavesLikeASubResource(VideoSong)
})
