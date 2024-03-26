import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDocument } from './user.schema';
import { Public } from '../auth/constants';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  listUsers(): Promise<UserDocument[]> {
    return this.userService.listUsers();
  }

  @Public()
  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

}
