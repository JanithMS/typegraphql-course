import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import HelloWorld from "./resolver";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import User from "./entities";

dotenv.config();

const main = async () => {
  const schema = await buildSchema({ resolvers: [HelloWorld] });
  const server = new ApolloServer({
    schema,
  });
  server.listen(8000).then(({ url }) => console.log(`running at ${url}`));
};

createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User],
  synchronize: true,
  logging: true
}).then(() => {
  console.log("Database connected")
  main();
}).catch((e) => {
  console.log(e)
})