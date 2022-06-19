import { expect } from '@dimensionalpocket/development'
import { Resource } from '../../src/Resource.js'
import { TestResource, TestResourceWithParent } from '../support/TestResource.js'

describe('Resource#endpoint', function () {
  it('returns the endpoint with ID', function () {
    TestResource.reset()
    TestResource.upsert({ id: 1 })

    let resource = TestResource.get(1)

    expect(resource.endpoint()).to.eq('/test_resources/1')
  })

  context('when item has a parent', function () {
    it('includes the parent endpoint', function () {
      TestResource.reset()
      TestResourceWithParent.reset()

      TestResource.upsert({ id: 1 })
      TestResourceWithParent.upsert({ id: 1 })

      let parent = TestResource.get(1)
      let child = TestResourceWithParent.get(1)

      child.parent = parent

      expect(child.endpoint()).to.eq('/test_resources/1/sub_test_resources/1')
    })
  })
})
