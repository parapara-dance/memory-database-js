import { Resource } from '../../src/Resource.js'

export class TestResource extends Resource {
  static $endpoint = '/test_resources'

  /** @type {boolean} */
  static downloading = true

  /** @type {Array<TestResource>} */
  static all = []

  /** @type {Map<id,TestResource>} */
  static $map = new Map()

  /** @type {Promise<any>|undefined} */
  static $promise = undefined

  testProperty = undefined

  /**
   * @param {any} data
   */
  update (data = null) {
    if (data == null) return
    super.update(data)
    this.testProperty = data.test_property
  }
}

export class TestResourceWithParent extends Resource {
  static $endpoint = '/sub_test_resources'
  static $parentProperty = 'parent'

  /** @type {boolean} */
  static downloading = true

  /** @type {Array<TestResourceWithParent>} */
  static all = []

  /** @type {Map<id,TestResourceWithParent>} */
  static $map = new Map()

  /** @type {Promise<any>|undefined} */
  static $promise = undefined

  /** @type {TestResource|undefined} */
  parent = undefined
}
