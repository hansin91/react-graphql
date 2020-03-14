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