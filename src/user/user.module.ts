import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

const mongooseModule = MongooseModule.forFeature([{
  name: User.name, schema: UserSchema,
}]);

@Module({
  imports: [mongooseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [mongooseModule, UserService]
})
export class UserModule {
}
