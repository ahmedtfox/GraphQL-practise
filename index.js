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
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => {
        return r.game_id === parent.id;
      });
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => {
        return r.game_id === parent.id;
      });
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((a) => {
        return parent.author_id === a.id;
      });
    },
    game(parent) {
      return db.games.find((g) => parent.game_id === g.id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      let generatedID;
      for (let i = 1; i < db.games.length + 2; i++) {
        const gg = db.games.find((g) => +g.id === i);
        if (!gg) {
          generatedID = i.toString();
          break; // Stop the loop as soon as we find an available ID
        }
      }
      let game = {
        id: generatedID,
        ...args.game,
      };
      db.games.push(game);
      return game;
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
