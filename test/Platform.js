import './support/api-mock.js'

// import { expect } from '@dimensionalpocket/development'
import { Platform } from '../src/Platform.js'
import { itBehavesLikeASubResource } from './shared-examples/it-behaves-like-a-subresource.js'

describe('Platform', function () {
  itBehavesLikeASubResource(Platform)
})
