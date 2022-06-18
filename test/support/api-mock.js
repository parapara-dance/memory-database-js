import nock from 'nock'
import ApiClient from '@dimensionalpocket/api-client'
import { Resource } from '../../src/Resource.js'

const apiUrl = 'http://memorydbtest.lvh.me'

Resource.$api = new ApiClient(apiUrl)

const scope = nock(apiUrl).persist()

const artist1 = { id: 1, n: 'Niko' }
const artist2 = { id: 2, n: 'Lolita' }
const artist3 = { id: 3, n: 'キーヤキッス', on: 'KEY-A-KISS' }

const song1 = { id: 1, t: 'Night of Fire', a: 1 }
const song2 = { id: 2, t: 'Try Me', a: 2 }
const song3 = { id: 3, t: 'LUCKY GIRLでいこう', ot: 'LUCKY GIRL DE IKOU', a: 3 }

scope.get('/artists').reply(200, [artist1, artist2, artist3])
scope.get('/songs').reply(200, [song1, song2, song3])
