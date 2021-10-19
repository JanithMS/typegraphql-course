import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import HelloWorld from "./resolver";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import User from "./entities";
import jwt from "jsonwebtoken";
import authChecker from "./authChecker";

dotenv.config();

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloWorld],
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }: { req: any }) => {
      let user;
      if (req.headers.authorization) {
        const token = req.headers.authorization;
        const decoded: any = jwt.verify(token!, process.env.JWT_TOKEN!);
        const users = await User.find({ where: { email: decoded.email } });
        user = users[0];
      }
      return { user };
    },
  });

  server.listen(8000).then(({ url }) => console.log(`running at ${url}`));
};

createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User],
  synchronize: true,
  logging: true,
})
  .then(() => {
    console.log("Database connected");
    main();
  })
  .catch((e) => {
    console.log(e);
  });
