import { Module } from "@nestjs/common";
import { ScheduleController } from "./schedule.controller";
import { ScheduleService } from "./schedule.service";
import { Schedule, ScheduleSchema } from "./schedule.schema";
import { MongooseModule } from "@nestjs/mongoose";

const scheduleModule = MongooseModule.forFeature([{
  name: Schedule.name, schema: ScheduleSchema,
}]);

@Module({
  imports: [scheduleModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [scheduleModule, ScheduleService]
})

export class ScheduleModule {
  
}