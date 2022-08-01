import './support/api-mock.js'

// import { expect } from '@dimensionalpocket/development'
import { Country } from '../src/Country.js'
import { itBehavesLikeASubResource } from './shared-examples/it-behaves-like-a-subresource.js'

describe('Country', function () {
  itBehavesLikeASubResource(Country)
})
