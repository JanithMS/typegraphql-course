import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User from "./entities";
import CreateUserInput from "./input";

@Resolver(() => Boolean)
class HelloWorld {
  @Query(() => [User])
  getUsers() {
    const users = User.find()
    return users;
  }

  @Mutation(() => Boolean)
  async createUser(
    @Arg("Data") createUserInput: CreateUserInput
  ) {
    const user = User.create({
      name: createUserInput.name,
      email: createUserInput.email,
      number: createUserInput.number,
    });
    user.save();

    return !!user;
  }
  //   CRUD
}

export default HelloWorld;
