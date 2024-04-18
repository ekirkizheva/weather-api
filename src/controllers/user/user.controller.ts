import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
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

    /**
     * This endpoint is used to create users
     * 
     * @param signInDto - expects json payload with username and password. 
     * @returns 
     */
    @UseGuards(RoleGuard(['admin']))
    @Post()
    postUser(@Body() signInDto: Record<string, string>) {
        return this.userService.postUser(signInDto.username, signInDto.password, signInDto.role);
    }
}
