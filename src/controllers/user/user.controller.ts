import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    /**
     * This endpoint is used to authenticate users. 
     * 
     * @param signInDto - expects json payload with username and password. 
     * @returns 
     */
    @Post('signin')
    signIn(@Body() signInDto: Record<string, string>) {
        return this.userService.signIn(signInDto.username, signInDto.password);
    }
}
