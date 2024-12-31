export enum Role {
  organizer = "Organizer",
  wife = "Wife",
  husband = "Husband",
  guest = "Guest",
}

export enum ReservationType {
  single = "Single",
  plusOne = "PlusOne",
}
export enum AttendanceResponse {
  attending = "Attending",
  declined = "Declined",
  unanswered = "Unanswered",
}
export const GetReservationType = (type: ReservationType) => {
  switch (type) {
    case ReservationType.single:
      return "Single";
    case ReservationType.plusOne:
      return "Plus 1";
  }
};

export enum UserType {
  guest = "guest",
  admin = "admin",
}

export enum CookieKey {
  adminUser = "adminUser",
  adminToken = "adminToken",
  guestToken = "guestToken",
}
export enum InvitedBy {
  bride = "Bride",
  groom = "Groom",
  groomParent = "Groom's Parent",
  brideParent = "Bride's Parent",
}
