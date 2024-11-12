import mongoose, { Schema } from "mongoose";
import { IGuest, IPlusOne } from "./guest";
import { InvitedBy, ReservationType } from "./enums";
export interface PlusOneDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
}
export interface PlusOneModelInterface extends mongoose.Model<PlusOneDoc> {
  build(attr: IPlusOne): PlusOneDoc;
}
export interface GuestDoc extends mongoose.Document {
  id: string;
  reservationType: ReservationType;
  invitedBy: InvitedBy;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  dateCreated: Date;
  reserved: boolean;
  plusOne?: IPlusOne;
}

export interface GuestModelInterface extends mongoose.Model<GuestDoc> {
  build(attr: IGuest): GuestDoc;
}
const plusOneSchema = new Schema<PlusOneDoc, PlusOneModelInterface>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guestSchema = new Schema<GuestDoc, GuestModelInterface>(
  {
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
    reserved: {
      type: Boolean,
      default: false,
    },
    invitedBy: {
      type: String,
      enum: InvitedBy,
      required: false,
    },
    reservationType: {
      type: String,
      enum: ReservationType,
      required: true,
    },
    plusOne: {
      type: plusOneSchema,
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

const Guest = (mongoose.models.Guest as GuestModelInterface) || mongoose.model<GuestDoc, GuestModelInterface>("Guest", guestSchema);
guestSchema.statics.build = (attr: IGuest) => new Guest(attr);

export { Guest, guestSchema };