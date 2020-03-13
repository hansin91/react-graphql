import { gql } from 'apollo-server'
const typeDef = gql`
  type Query {
    id: ID!
  }
`
export default typeDef