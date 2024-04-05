import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Schedule, ScheduleDocument } from './schedule.schema';
import { Client } from './client.schema';
import { User } from './user.schema';

export type ServiceOfferingDocument = HydratedDocument<ServiceOffering>;

@Schema()
export class ServiceOffering {
  public _id: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public price: number;

  @Prop({ required: true })
  public description: string;

  @Prop({ required: true })
  public duration: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  client: Client;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }] })
  public availableSchedule: ScheduleDocument[];
}

export const ServiceOfferingSchema = SchemaFactory.createForClass(ServiceOffering);
