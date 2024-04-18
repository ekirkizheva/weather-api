import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
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
     * @param userDto - expects json payload with username, password and role. 
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
     * @param id - expects username. 
     * @returns 
     */
    @UseGuards(RoleGuard(['admin']))
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

    /**
     * This endpoint is used to batch delete students between dates. 
     * 
     * @param start_date - expects start date of the range. 
     * @param end_date - expects end date of the range. 
     * @returns 
     */
    @UseGuards(RoleGuard(['admin']))
    @Delete('students/:start_date/:end_date')
    deleteStudentsBetweenDates(@Param('start_date') start_date: Date, @Param('end_date') end_date: Date) {
        return this.userService.deleteStudentsBetweenDates(start_date, end_date);
    }

     /**
     * This endpoint is used to batch update set of users created between dates. 
     * 
     * @param role - expects target user role.
     * @param start_date - expects start date of the range. 
     * @param end_date - expects end date of the range. 
     * @returns 
     */
    @UseGuards(RoleGuard(['admin']))
    @Put(':role/:start_date/:end_date')
    putUser(@Param('role') role: string, @Param('start_date') start_date: Date, @Param('end_date') end_date: Date) {
        return this.userService.putUser(role, start_date, end_date);
    }
}
