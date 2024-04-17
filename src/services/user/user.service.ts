import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interface/user.interface';

@Injectable()
export class UserService {

    constructor(@InjectModel('UserData') private userModel:Model<IUser>) { }
}
