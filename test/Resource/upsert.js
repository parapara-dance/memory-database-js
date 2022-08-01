import { expect } from '@dimensionalpocket/development'
import { TestResource } from '../support/TestResource.js'

describe('Resource.upsert', function () {
  beforeEach(function () {
    TestResource.reset()
  })

  it('adds a new item', function () {
    TestResource.upsert({ id: 1, test_property: 2 })
    let resource = TestResource.get(1)

    expect(resource).to.be.an.instanceOf(TestResource)
    expect(resource.id).to.eq(1)
    expect(resource.testProperty).to.eq(2)
  })

  context('when item exists', function () {
    it('updates the item', function () {
      TestResource.upsert({ id: 1, test_property: 2 })
      TestResource.upsert({ id: 1, test_property: 3 })

      let resource = TestResource.get(1)
      expect(resource.testProperty).to.eq(3)
    })
  })
})
