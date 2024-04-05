import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../auth/constants';
import { User, UserTypeEnum } from '../schema/user.schema';
import { CustomerDocument } from '../schema/customer.schema';
import { ClientDocument } from '../schema/client.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  listUsers(@Query('type') type: UserTypeEnum): Promise<CustomerDocument[] | ClientDocument[]> {
    return this.userService.listUsers(type);
  }

  @Public()
  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }
}
