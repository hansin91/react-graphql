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

export const UPDATE_MOVIE_IMAGE = gql`
  mutation UpdateMovieImage ($input: updateMovieImage!) {
    updateMovieImage(input: $input) {
      _id
      title
      overview
      popularity
      poster_path
      tags
      delete_hash
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie ($input: updateMovieInput!) {
    updateMovie(input: $input) {
      _id
      title
      overview
      popularity
      poster_path
      tags
      delete_hash
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation DeleteMovie ($id: ID!) {
    deleteMovie(id: $id) {
      status
      message
    }
  }
`