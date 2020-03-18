import { gql } from 'apollo-server'
const typeDef = gql`
  scalar Upload

  type Response {
    status: Int
    message: String
  }

  type Mutation {
    id: ID!
  }
`
export default typeDef