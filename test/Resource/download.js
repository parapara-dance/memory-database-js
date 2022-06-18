import { expect } from '@dimensionalpocket/development'
import { TestResource } from '../support/TestResource.js'

describe('Resource.download', function () {
  beforeEach(function () {
    TestResource.reset()
  })

  it('downloads data from API and sets Resource instances', async function () {
    await TestResource.download()

    expect(TestResource.all.length).to.eq(2)
    TestResource.all.forEach(t => {
      expect(t).to.be.an.instanceOf(TestResource)
    })

    expect(TestResource.find(1).testProperty).to.eq('A')
    expect(TestResource.find(2).testProperty).to.eq('B')
  })
})
