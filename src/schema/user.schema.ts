import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({collection: 'User'})
export class UserRecord {
   @Prop()
   username: string;

   @Prop()
   password: string;
   
   @Prop()
   role: string;
   
   @Prop()
   last_login: Date;
}
export const UserSchema = SchemaFactory.createForClass(UserRecord);