import mongoose, { Schema } from "mongoose";
import { IUser, Message, MiniUser } from "./user";
import { Role } from "./enums";
export interface MessageDoc extends mongoose.Document {
  from: MiniUser;
  message: string;
}
export interface MessageModelInterface extends mongoose.Model<MessageDoc> {
  build(attr: IUser): UserDoc;
}
const messageSchema = new Schema<MessageDoc, MessageModelInterface>(
  {
    from: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
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
export interface UserDoc extends mongoose.Document {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  dateCreated: Date;
  dateUpdated: Date;
  adminMessages: MessageDoc[];
  guestMessages: MessageDoc[];
}

export interface UserModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}
const userSchema = new Schema<UserDoc, UserModelInterface>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Role,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
    dateUpdated: {
      type: Date,
      default: Date.now(),
    },
    adminMessages: {
      type: [messageSchema],
      default: [],
    },
    guestMessages: {
      type: [messageSchema],
      default: [],
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const User = (mongoose.models.User as UserModelInterface) ?? mongoose.model<UserDoc, UserModelInterface>("User", userSchema);
userSchema.statics.build = (attr: IUser) => new User(attr);

export { User, userSchema };
