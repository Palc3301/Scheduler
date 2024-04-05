import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule, ScheduleDocument } from '../schema/schedule.schema';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  listSchedules(): Promise<ScheduleDocument[]> {
    return this.scheduleService.listSchedules();
  }

  @Post()
  createSchedule(@Request() req, @Body() schedule: Schedule): Promise<Schedule> {
    const { sub } = req.user;
    return this.scheduleService.createSchedule({ client: sub, ...schedule });
  }

  @Put()
  updateSchedule(@Param('id') id: string, @Body() schedule: Schedule): Promise<Schedule> {
    return this.scheduleService.updateSchedule(id, schedule);
  }

  @Delete()
  deleteSchedule(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.deleteSchedule(id);
  }
}
