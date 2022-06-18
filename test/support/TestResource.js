import ApiClient from '@dimensionalpocket/api-client'
import { Resource } from '../../src/Resource.js'
import nock from 'nock'

const apiUrl = 'http://memorydbtest.lvh.me'

Resource.$api = new ApiClient(apiUrl)

const scope = nock(apiUrl).persist()

const resource1 = { id: 1, test_property: 'A' }
const resource2 = { id: 2, test_property: 'B' }

scope.get('/test_resources').reply(200, [resource1, resource2])

export class TestResource extends Resource {
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
