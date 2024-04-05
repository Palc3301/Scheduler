import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

export enum ServicesEnum {
  BARBER = 'Barber',
}

@Schema()
export class Client {
  @Prop({ required: true, type: String, enum: Object.values(ServicesEnum) })
  service: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
