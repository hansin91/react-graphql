import { gql } from 'apollo-server'
const typeDef = gql`
  scalar Upload
  type Mutation {
    id: ID!
  }
`
export default typeDef