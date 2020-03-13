import { gql } from 'apollo-server'
const typeDef = gql`
  type Movie {
    _id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]!
  }

  extend type Query {
    getMovies: [Movie]!
  }

  extend type Mutation {
    addMovie(input: createMovieInput!): Movie!
    updateMovie(input: updateMovieInput!): Movie!
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
  }
`
export default typeDef