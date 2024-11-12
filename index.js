import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import process from "process";
const PORT = process.env.PORT;
// setup server

const server = new ApolloServer({
    
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log("Server ready at port", PORT);
