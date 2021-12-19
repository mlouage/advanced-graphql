import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

const port = process.env.PORT;

const gateway = new ApolloGateway({
    serviceList: [
        { name: "accounts", url: process.env.ACCOUNTS_SERVICE_URL }
    ]
});

async function startApolloServer() {
    // Required logic for integrating with Express
    const app = express();
    const httpServer = http.createServer(app);
  
    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
      gateway,
      subscriptions: false,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
  
    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
      app,
  
      // By default, apollo-server hosts its GraphQL endpoint at the
      // server root. However, *other* Apollo Server packages host it at
      // /graphql. Optionally provide this to match apollo-server.
      path: '/',
    });
  
    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }

startApolloServer();