import { gql } from 'apollo-server'
const typeDef = gql`
  type TVSerie {
    _id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]!
  }

  extend type Query {
    getTVSeries: [TVSerie]!
  }
`
export default typeDef