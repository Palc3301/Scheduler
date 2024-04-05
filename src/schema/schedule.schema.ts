import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Client } from './client.schema';
import { User } from './user.schema';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
  public _id: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Boolean, default: true })
  available: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  client: Client;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
