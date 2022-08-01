# @parapara-dance/memory-database-js

[![build](https://github.com/parapara-dance/memory-database-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/parapara-dance/memory-database-js/actions/workflows/node.js.yml) [![Total alerts](https://img.shields.io/lgtm/alerts/g/parapara-dance/memory-database-js.svg)](https://lgtm.com/projects/g/parapara-dance/memory-database-js/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/parapara-dance/memory-database-js.svg)](https://lgtm.com/projects/g/dimensionalpocket/3d-client-three/context:javascript)

Vue-friendly in-memory resource database used by the website.

## Usage

```js
import { Resource, Song } from '@parapara-dance/memory-database'
import ApiClient from '@dimensionalpocket/api-client' // included in this library

// API client to be used by all resources.
Resource.$api = new ApiClient(...)

// Download all resources from the API once, and store them in memory.
// The promise is stored for the lifetime of the object.
// To refresh promise (and fetch all resources from API again), pass `true` as argument.
// The promise returns an array of objects.
var songs = await Song.all()

// Alternatively, if the songs have already been download, you can call the array directly.
// This array is reactive.
var songs = Song.cached

// Get a a resource from memory. This does not call the API.
var song = Song.get(id)

// Use #find (async) to download the item from the API if it's not available in memory.
// It returns `null` if the item is not found.
var song = await Song.find(id)

// Use #fetch (async) to forcibly download the item from the API, even if it exists on memory.
// It returns `null` if the item is not found.
var song = await Song.fetch(id)

// Save a resource into the API (POST or PATCH depending on ID existence).
// Local object will be updated automatically on success.
song.title = 'Deja Vu'
await song.save()
```

## License

MIT
