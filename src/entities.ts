import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("User")
@ObjectType("User")
class User extends BaseEntity {

    @Column()
    @Field()
    name: string;

    @PrimaryColumn()
    @Field()
    email: string;

    @Column({type: "float", nullable: true})
    @Field()
    number: number
}

export default User;