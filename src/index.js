// import { GraphqlServer } from "graphql-yoga";
import { GraphQLServer } from "graphql-yoga";
import db from "./db";
import Query from "./resolvers/Query";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
  context: {
    db,
  },
});

server.start(() => {
  console.log("Server started");
});
