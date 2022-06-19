import './support/api-mock.js'

// import { expect } from '@dimensionalpocket/development'
import { Stat } from '../src/Stat.js'
import { itBehavesLikeASubResource } from './shared-examples/it-behaves-like-a-subresource.js'

describe('Stat', function () {
  itBehavesLikeASubResource(Stat)
})
