import { Document } from 'mongoose';
export interface IUser extends Document {
    readonly username: string;
    readonly password: string;
    readonly role: string;
    readonly last_login: Date;
}