import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import { Movie, TVSerie, Query, Mutation } from './typedefs'
import QueryResolver from './resolvers/Query'
import MutationResolver from './resolvers/Mutation'
const schema = makeExecutableSchema({
  typeDefs: [Movie, TVSerie, Query, Mutation],
  resolvers: {
    Query: QueryResolver,
    Mutation: MutationResolver
  }
})

const server = new ApolloServer({
  schema
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})