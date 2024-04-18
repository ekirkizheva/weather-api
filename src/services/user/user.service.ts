import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { IUser } from 'src/interface/user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('UserData') 
        private userModel:Model<IUser>, 
        private jwtService: JwtService) { }


    async seedUser() {
        if (! await this.userModel.findOne({})) {
            await this.userModel.insertMany([{
                username: 'admin',
                password: await bcrypt.hash('admin',10),
                role: 'admin',
                last_login: new Date()
            }]);
        }
    }

    async signIn(
        username: string,
        password: string,
      ): Promise<{ access_token: string }> {

        if (!username || !password) {
            throw new ForbiddenException('Missing arguments');
        }

        // NOT TO BE USED IN PRODUCTION
        // ALLOWS FOR INITIAL USER CREATION
        await this.seedUser();
        
        const user = await this.userModel.findOneAndUpdate({username}, {last_login: new Date()});

        if (!user || !(await bcrypt.compare(password, user?.password))) {
            throw new UnauthorizedException();
        }
      
        const payload = { sub: user.id, username: user.username, role: user.role };
        
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }

      async postUser(
        username: string,
        password: string,
        role: string
      ): Promise<any> {

        if (!username || !password || !role) {
            throw new ForbiddenException('Missing arguments');
        }

        const exists = await this.userModel.findOne({ username });

        if (exists) throw new ForbiddenException('User already exists')

        await this.userModel.insertMany([{
            username,
            password: await bcrypt.hash(password,10),
            role,
            last_login: new Date()
        }]);

        return { result: 'User created' }
      }
}
