# @parapara-dance/memory-database-js

Vue-friendly in-memory resource database used by the website.

## Usage

```js
// API client to be used by all resources.
Resource.$api = new ApiClient(...)

class Song extends Resource {
  static $endpoint = '/songs'
  
  // Object properties
  name = null
  alt_name = null
  artist_id = null
  
  // Associations are defined in the constructor
  constructor () {
    super()
    this.artist = new Association({owner: this, belongs_to: Artist, where: (song, artists) => {})
    this.videos = new Association({owner: this, has_many: Video, where: (song, videos) => {})    
  }
}

// Other resources.
class Artist extends Resource {...}
class Video extends Resource {...}

// Fetch all resources from the API and store them in memory.
// The promise is stored for the lifetime of the object.
// To refresh promise (and fetch all resources from API again), pass force as true.
await Song.fetch(force: false)

// Find a resource.
var song = await Song.find(id)

// Update the attributes of a resource.
song.name = 'Deja Vu'

// Save a resource (POST or PATCH depending on id existence).
await song.save()
```

## License

MIT
