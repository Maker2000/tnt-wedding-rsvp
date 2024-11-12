import mongoose, { Schema } from "mongoose";
import { Role } from "./enums";
import { Validation } from "@/lib/contracts";
export interface MiniUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}
export interface LoginDto {
  email: string;
  password: string;
}
export interface Message {
  from: MiniUser;
  message: string;
}
export class DisplayUser {
  id!: string;
  email!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  role!: Role;
  adminMessages!: Message[];
  guestMessages!: Message[];
  nickname(): string {
    switch (this.role) {
      case Role.husband:
        return "huzzie";
      case Role.wife:
        return "wifie";
      case Role.organizer:
        return Role.organizer.toLowerCase();
      default:
        return "visiter";
    }
  }
  constructor(user: any) {
    this.id = user?.id;
    this.email = user?.email;
    this.username = user?.username;
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.role = user?.role;
    this.adminMessages = user?.adminMessages ?? [];
    this.guestMessages = user?.guestMessages ?? [];
  }
}
export class AuthenticatedUserResponse {
  user: IUser;
  token: string;
  constructor(user: IUser, token: string) {
    this.user = user;
    this.token = token;
  }
}
export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}
export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  dateCreated: Date;
  dateUpdated: Date;
  adminMessages: Message[];
  guestMessages: Message[];
}

export interface ResetPasswordDto {
  oldPassword: string;
  newPassword: string;
}
export const validatePasswordReset = (dto: ResetPasswordDto) => {
  Validation.requireNotNull(dto.oldPassword, "Previous password is required");
  Validation.requireNotNull(dto.newPassword, "New password is required");
};
