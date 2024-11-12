import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import process from "process";
const PORT = process.env.PORT || 3000;
import { typeDefs } from "./schema.js";
// db
import db from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
  },
};

// setup server

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log("Server ready at port", PORT);
