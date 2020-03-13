import { gql } from 'apollo-server'
const typeDef = gql`
  type Mutation {
    id: ID!
  }
`
export default typeDef