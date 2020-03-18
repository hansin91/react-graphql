import { gql } from 'apollo-boost'

export const ADD_TV_SERIE = gql`
  mutation AddTVSerie ($input: createTVSerieInput!) {
    addTVSerie(input: $input) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

// export const UPDATE_MOVIE = gql`
//   mutation UpdateMovie ($input: updateMovieInput!) {
//     updateMovie(input: $input) {
//       _id
//       title
//       overview
//       popularity
//       poster_path
//       tags
//       delete_hash
//     }
//   }
// `

// export const DELETE_MOVIE = gql`
//   mutation DeleteMovie ($id: ID!) {
//     deleteMovie(id: $id) {
//       status
//       message
//     }
//   }
// `