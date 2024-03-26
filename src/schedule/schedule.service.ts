import { Injectable } from "@nestjs/common";
import { Schedule, ScheduleDocument } from "./schedule.schema";

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<Schedule>) {}

  public async listSchedules(): Promise<ScheduleDocument[]> {
    return this.shechuleModel.find().exec();
  }

  public async createSchedule(schedule: Schedule): Promise<ScheduleDocument> {
    const scheduleCreated = await this.scheduleModel.create(schedule);
    return this.scheduleModel.findById(scheduleCreated._id).exec();
  }

  public async updateSchedule(id: string, schedule: Schedule): Promise<ScheduleDocument> {
    await this.scheduleModel.updateOne({ _id: id }, schedule).exec();
    return this.scheduleModel.findById(id).exec();
  }

  public async deleteSchedule(id: string): Promise<ScheduleDocument> {
    return this.scheduleModel.findByIdAndDelete(id).exec();
}