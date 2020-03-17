import { ObjectID } from 'mongodb'
class Movie {

  static addMovie (collection, params) {
    return collection.insertOne({
      title: params.title,
      overview: params.overview,
      poster_path: params.poster_path,
      popularity: params.popularity,
      tags: params.tags,
      delete_hash: params.delete_hash
    })
  }

  static fetchMovies (collection) {
    return collection.find({}).toArray()
  }

  static updateMovie (collection, params) {
    const { id, title, overview, poster_path, popularity, tags } = params
    return collection.updateOne({ _id: ObjectID(id) },
      {
        $set:
          { title, overview, poster_path, popularity, tags }
      })
  }

  static updateMovieImage (collection, params) {
    const { id, poster_path, delete_hash } = params
    return collection.updateOne({ _id: ObjectID(id) },
      {
        $set:
          { poster_path, delete_hash }
      })
  }

  static deleteMovie (collection, id) {
    return collection.deleteOne({ _id: ObjectID(id) })
  }

  static findOne (collection, id) {
    return collection.findOne({ _id: ObjectID(id) })
  }

}

export default Movie