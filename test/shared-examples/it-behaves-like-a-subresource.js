import { expect } from '@dimensionalpocket/development'
import { Resource } from '../../src/Resource.js'

/**
 * @param {any} subResourceClass
 */
export function itBehavesLikeASubResource (subResourceClass) {
  it('shares the $api client', function () {
    expect(subResourceClass.$api).to.eq(Resource.$api)
  })

  it('does not share the array of objects', function () {
    Resource.upsert({ id: 1 })
    subResourceClass.upsert({ id: 2 })

    expect(subResourceClass.all).to.not.eq(Resource.all)

    Resource.reset()
    subResourceClass.reset()
  })

  it('does not share the object map', function () {
    Resource.upsert({ id: 1 })
    subResourceClass.upsert({ id: 2 })

    expect(subResourceClass.$map).to.not.eq(Resource.$map)

    Resource.reset()
    subResourceClass.reset()
  })

  it('does not share the query promise', function () {
    Resource.$promise = Promise.resolve(Resource)
    subResourceClass.$promise = Promise.resolve(subResourceClass)

    expect(subResourceClass.$promise).to.not.eq(Resource.$promise)

    Resource.reset()
    subResourceClass.reset()
  })

  it('does not share the downloading state', function () {
    Resource.downloading = true

    expect(subResourceClass.downloading).to.not.eq(Resource.downloading)

    Resource.reset()
    subResourceClass.reset()
  })

  it('does not share the endpoint', function () {
    var oldResourceEndpoint = Resource.$endpoint
    Resource.$endpoint = '/something'

    expect(subResourceClass.$endpoint).to.not.eq(Resource.$endpoint)

    Resource.$endpoint = oldResourceEndpoint
  })
}
