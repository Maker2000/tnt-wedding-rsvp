import mongoose, { Schema } from "mongoose";
import { InvitedBy, ReservationType } from "./enums";

export interface IPlusOne {
  firstName: string;
  lastName: string;
}

export interface CreateGuestDto {
  reservationType?: ReservationType;
  invitedBy?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  plusOne?: IPlusOne;
}

export interface IGuest {
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
export class GuestDisplay implements IGuest {
  id!: string;
  reservationType!: ReservationType;
  invitedBy!: InvitedBy;
  firstName!: string;
  lastName!: string;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  dateCreated!: Date;
  reserved!: boolean;
  plusOne?: IPlusOne | undefined;
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export interface GuestQrUrlResponse {
  url: string;
}
