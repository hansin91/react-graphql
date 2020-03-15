import { gql } from 'apollo-boost'

export const ADD_MOVIE = gql`
  mutation AddMovie ($input: createMovieInput!) {
    addMovie(input: $input) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`