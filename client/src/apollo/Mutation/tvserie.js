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

export const DELETE_TV_SERIE = gql`
  mutation DeleteTVSerie ($id: ID!) {
    deleteTVSerie(id: $id) {
      status
      message
    }
  }
`