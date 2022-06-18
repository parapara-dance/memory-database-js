import { expect } from '@dimensionalpocket/development'
import { Resource } from '../src/Resource.js'

class TestResource extends Resource {
  static $endpoint = '/test_resources'

  testProperty = null

  /**
   * @param {any} data
   */
  update (data = null) {
    if (data == null) return
    super.update(data)
    this.testProperty = data.test_property
  }
}

describe('Resource', function () {
  beforeEach(function () {
    TestResource.reset()
  })

  describe('.upsert', function () {
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
})
