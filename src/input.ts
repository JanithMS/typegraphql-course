import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType("CreateUserInput")
class CreateUserInput {

    @Field()
    @IsEmail()
    email: string;

    @Field()
    name: string;

    @Field()
    number: number
}

export default CreateUserInput;