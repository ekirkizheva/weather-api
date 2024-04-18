import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
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
     * @param signInDto - expects json payload with username, password and role. 
     * @returns 
     */
    @UseGuards(RoleGuard(['admin']))
    @Post()
    postUser(@Body() userDto: Record<string, string>) {
        return this.userService.postUser(userDto.username, userDto.password, userDto.role);
    }

    /**
     * This endpoint is used to delete users
     * 
     * @param signInDto - expects json payload with username. 
     * @returns 
     */
    @UseGuards(RoleGuard(['admin']))
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
