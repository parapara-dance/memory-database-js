# @parapara-dance/memory-database-js

[![build](https://github.com/parapara-dance/memory-database-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/parapara-dance/memory-database-js/actions/workflows/node.js.yml) [![Total alerts](https://img.shields.io/lgtm/alerts/g/parapara-dance/memory-database-js.svg)](https://lgtm.com/projects/g/parapara-dance/memory-database-js/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/parapara-dance/memory-database-js.svg)](https://lgtm.com/projects/g/dimensionalpocket/3d-client-three/context:javascript)

Vue-friendly in-memory resource database used by the website.

## Usage

```js
// API client to be used by all resources.
Resource.$api = new ApiClient(...)

class Song extends Resource {
  static $endpoint = '/songs'
  
  // Resource properties
  title = null
  artistId = null
  
  // Associations are defined in the constructor
  constructor () {
    super()
    this.artist = new Association({owner: this, belongs_to: Artist})
    this.videos = new Association({owner: this, has_many: Video})
  }
}

// Other resources.
class Artist extends Resource {...}
class Video extends Resource {...}

// Download all resources from the API once, and store them in memory.
// The promise is stored for the lifetime of the object.
// To refresh promise (and fetch all resources from API again), pass `true` as argument.
await Song.download()

// Get a a resource from memory.
var song = Song.get(id)

// Alternatively, use #find (async) to call download() before returning the item.
var song = await Song.find(id)

// Upload (save) a resource into the API (POST or PATCH depending on id existence).
song.title = 'Deja Vu'
await song.upload()
```

## License

MIT
