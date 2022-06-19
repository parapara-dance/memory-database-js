import './support/api-mock.js'

// import { expect } from '@dimensionalpocket/development'
import { Video } from '../src/Video.js'
import { itBehavesLikeASubResource } from './shared-examples/it-behaves-like-a-subresource.js'

describe('Video', function () {
  itBehavesLikeASubResource(Video)
})
