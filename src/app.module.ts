import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from './constants';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './error/all-exceptions-filter';
import { ScheduleModule } from './schedule/schedule.module';
import { SchemaModule } from './schema/schema.module';
import { ServiceOfferingModule } from './serviceOffering/serviceOffering.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    UserModule,
    AuthModule,
    ScheduleModule,
    SchemaModule,
    ServiceOfferingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
