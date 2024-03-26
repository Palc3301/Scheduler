import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
  public _id: string;

  @Prop({ type: [String], default: [] })
  monday: string[];

  @Prop({ type: [String], default: [] })
  tuesday: string[];

  @Prop({ type: [String], default: [] })
  wenesday: string[];

  @Prop({ type: [String], default: []})
  thursday: string[];

  @Prop({ type: [String], default: []})
  friday: string[];

  @Prop({ type: [String], default: []})
  saturday: string[];

  @Prop({ type: [String], default: []})
  sunday: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
