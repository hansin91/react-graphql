import { gql } from 'apollo-server'
const typeDef = gql`
  type TVSerie {
    _id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]!
    delete_hash: String
  }

  extend type Query {
    getTVSeries: [TVSerie]!
    getTVSerie(id: ID!): TVSerie!
  }

  extend type Mutation {
    addTVSerie(input: createTVSerieInput!): TVSerie!
    updateTVSerie(input: updateTVSerieInput!): TVSerie!
    deleteTVSerie(id: ID!): Response!
  }

  input updateTVSerieInput {
    id: ID!
    title: String!
    overview: String!
    popularity: Float!
    tags: [String!]!
    poster_path: String!
    delete_hash: String!
  }

  input createTVSerieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]!
    delete_hash: String
  }
`
export default typeDef