import { Resource } from '../../src/Resource.js'

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
