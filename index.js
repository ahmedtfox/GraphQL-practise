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
    game(_, args) {
      return db.games.find((game) => {
        return game.id === args.id;
      });
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find((author) => {
        return author.id === args.id;
      });
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => {
        return review.id === args.id;
      });
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
