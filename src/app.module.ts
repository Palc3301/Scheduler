import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from './constants';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './error/all-exceptions-filter';
import { ScheduleModule } from './schedule/schedule.module';


@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), UserModule, AuthModule, ScheduleModule],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }],
})
export class AppModule {
}
