import { gql } from 'apollo-boost'

export const FETCH_MOVIES = gql`
  {
    getMovies {
      _id
      title
      overview
      poster_path
      popularity
      tags
  }
}
`

export const FETCH_MOVIE = gql`
  query GetMovie ($id: ID!)
  {
    getMovie(id: $id){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`