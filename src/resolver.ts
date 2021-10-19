import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User from "./entities";
import CreateUserInput from "./input";
import jwt from "jsonwebtoken";
import MyContext from "./context";

// @ObjectType()
// class LoginOutput {
//   @Field(() => User)
//   user: User

//   @Field(() => String)
//   token: string
// }

@Resolver(() => Boolean)
class HelloWorld {
  @Query(() => [User])
  @Authorized()
  getUsers() {
    const users = User.find();
    return users;
  }

  @Mutation(() => Boolean)
  async createUser(@Arg("Data") createUserInput: CreateUserInput) {
    const user = User.create({
      name: createUserInput.name,
      email: createUserInput.email,
      number: createUserInput.number,
    });
    user.save();

    return !!user;
  }

  @Mutation(() => String)
  async login(@Arg("email") email: string) {
    const user = await User.find({ where: { email } });
    const token = jwt.sign({ email: user[0].email }, process.env.JWT_TOKEN!);
    return token;
  }

  @Query(() => User)
  @Authorized()
  me(@Ctx() { user }: MyContext) {
    return user;
  }
  //   CRUD
}

export default HelloWorld;
