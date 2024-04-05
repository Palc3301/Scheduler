import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Client } from './client.schema';
import { Customer } from './customer.schema';

export type UserDocument = HydratedDocument<User>;

export enum UserTypeEnum {
  CLIENT = 'Client',
  CUSTOMER = 'Customer',
}

@Schema({ discriminatorKey: 'type' })
export class User {
  public _id: string;

  @Prop({ required: true, default: UserTypeEnum.CUSTOMER, enum: [Client.name, Customer.name] })
  public type: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();

  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }

  return next();
});
