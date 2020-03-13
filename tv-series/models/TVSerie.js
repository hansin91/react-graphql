import { ObjectID } from 'mongodb'
class TVSerie {

  static addSerieMovie (collection, params) {
    return collection.insertOne({
      title: params.title,
      overview: params.overview,
      poster_path: params.poster_path,
      popularity: params.popularity,
      tags: params.tags
    })
  }

  static fetchSerieMovies (collection) {
    return collection.find({}).toArray()
  }

  static updateSerieMovie (collection, params) {
    const { id, title, overview, poster_path, popularity, tags } = params
    return collection.updateOne({ _id: ObjectID(id) },
      {
        $set:
          { title, overview, poster_path, popularity, tags }
      })
  }

  static deleteSerieMovie (collection, id) {
    return collection.deleteOne({ _id: ObjectID(id) })
  }

  static findOne (collection, id) {
    return collection.findOne({ _id: ObjectID(id) })
  }

}

export default TVSerie