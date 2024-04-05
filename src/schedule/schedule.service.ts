import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from '../schema/schedule.schema';

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<Schedule>) {}

  public async listSchedules(): Promise<ScheduleDocument[]> {
    return this.scheduleModel.find().populate('client', '-password');
  }

  public async createSchedule(schedule: Schedule): Promise<ScheduleDocument> {
    const scheduleCreated = await this.scheduleModel.create(schedule);
    return this.scheduleModel.findById(scheduleCreated._id);
  }

  public async updateSchedule(id: string, schedule: Schedule): Promise<ScheduleDocument> {
    await this.scheduleModel.updateOne({ _id: id }, schedule);
    return this.scheduleModel.findById(id);
  }

  public async deleteSchedule(id: string): Promise<ScheduleDocument> {
    return this.scheduleModel.findByIdAndDelete(id);
  }
}
