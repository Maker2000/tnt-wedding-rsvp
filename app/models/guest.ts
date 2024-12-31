import mongoose, { Schema } from "mongoose";
import { AttendanceResponse, InvitedBy, ReservationType } from "./enums";

export interface IPlusOne {
  firstName: string;
  lastName: string;
}

export interface CreateGuestDto {
  reservationType?: ReservationType;
  invitedBy?: string;
  firstName: string;
  lastName: string;
  plusOne?: IPlusOne;
}

export interface IGuest {
  id: string;
  reservationType: ReservationType;
  invitedBy: InvitedBy;
  firstName: string;
  lastName: string;
  dateCreated: Date;
  response: AttendanceResponse;
  plusOne?: IPlusOne;
}
export class GuestDisplay implements IGuest {
  id!: string;
  reservationType!: ReservationType;
  invitedBy!: InvitedBy;
  firstName!: string;
  lastName!: string;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  dateCreated!: Date;
  response!: AttendanceResponse;
  plusOne?: IPlusOne | undefined;
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export interface GuestQrUrlResponse {
  url: string;
}
