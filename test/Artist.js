import './support/api-mock.js'

import { expect } from '@dimensionalpocket/development'
import { Artist } from '../src/Artist.js'
import { itBehavesLikeASubResource } from './shared-examples/it-behaves-like-a-subresource.js'

describe('Artist', function () {
  itBehavesLikeASubResource(Artist)

  describe('.download', function () {
    it('downloads data from API and sets Artist instances', async function () {
      Artist.reset()
      await Artist.download()

      expect(Artist.all.length).to.eq(3)

      Artist.all.forEach(t => {
        expect(t).to.be.an.instanceOf(Artist)
      })

      expect(Artist.get(1).name).to.eq('Niko')
      expect(Artist.get(2).name).to.eq('Lolita')
      expect(Artist.get(3).name).to.eq('キーヤキッス')
      expect(Artist.get(3).nameAlt).to.eq('KEY-A-KISS')
    })
  })

  describe('#update', function () {
    it('sets id', function () {
      var artist = new Artist()
      artist.update({ id: 123 })
      expect(artist.id).to.eq(123)
    })

    it('sets name', function () {
      var artist = new Artist()
      artist.update({ n: 'Original Name' })
      expect(artist.name).to.eq('Original Name')
    })

    it('sets nameAlt', function () {
      var artist = new Artist()
      artist.update({ on: 'Alt Name' })
      expect(artist.nameAlt).to.eq('Alt Name')
    })

    it('sets autocomplete', function () {
      var artist = new Artist()
      artist.update({ n: 'Original Name', on: 'Alt Name' })
      expect(artist.autocomplete).to.eq('Original Name / Alt Name')
    })

    context('when data is null', function () {
      it('does not remove data', function () {
        var artist = new Artist()
        artist.update({ n: 'Original Name', on: 'Alt Name' })
        artist.update()
        expect(artist.name).to.eq('Original Name')
        expect(artist.nameAlt).to.eq('Alt Name')
      })
    })
  })
})
