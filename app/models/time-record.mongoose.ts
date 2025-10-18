import mongoose, { Schema } from "mongoose";
import { ITimeRecord } from "./time-record";
export interface TimeRecordDoc extends mongoose.Document {
  id: string;
  clockInTime: Date;
  clockOutTime?: Date;
  paid: boolean;
}
export interface TimeRecordModelInterface extends mongoose.Model<TimeRecordDoc> {
  build(attr: ITimeRecord): TimeRecordDoc;
}

const timeRecordSchema = new Schema<TimeRecordDoc, TimeRecordModelInterface>(
  {
    clockInTime: {
      type: Date,
      required: true,
    },
    clockOutTime: {
      type: Date,
      required: false,
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const TimeRecord =
  (mongoose.models.TimeRecord as TimeRecordModelInterface) || mongoose.model<TimeRecordDoc, TimeRecordModelInterface>("TimeRecord", timeRecordSchema);
timeRecordSchema.statics.build = (attr: ITimeRecord) => new TimeRecord(attr);

export { TimeRecord, timeRecordSchema };
