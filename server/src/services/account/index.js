import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const port = process.env.ACCOUNTS_SERVICE_PORT;
const server = new ApolloServer({ 
        schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});