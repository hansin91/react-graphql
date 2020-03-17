import { gql } from 'apollo-server'
const typeDef = gql`
  type Movie {
    _id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]!
    delete_hash: String
  }

  extend type Query {
    getMovies: [Movie]!
    getMovie(id: ID!): Movie!
  }

  extend type Mutation {
    addMovie(input: createMovieInput!): Movie!
    updateMovie(input: createMovieInput!): Movie!
    updateMovieImage(input: updateMovieImage!): Movie!
  }

  input updateMovieImage {
    id: ID!
    poster_path: String!
    delete_hash: String!
  }

  input updateMovieInput {
    id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]!
  }

  input createMovieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]!
    delete_hash: String
  }
`
export default typeDef