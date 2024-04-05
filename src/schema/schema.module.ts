import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Client, ClientSchema } from './client.schema';
import { Customer, CustomerSchema } from './customer.schema';
import { Schedule, ScheduleSchema } from './schedule.schema';

const mongooseModule = MongooseModule.forFeature([
  {
    name: Schedule.name,
    schema: ScheduleSchema,
  },
  {
    name: User.name,
    schema: UserSchema,
    discriminators: [
      { name: Client.name, schema: ClientSchema },
      { name: Customer.name, schema: CustomerSchema },
    ],
  },
]);

@Module({
  imports: [mongooseModule],
  exports: [mongooseModule],
})
export class SchemaModule {}
