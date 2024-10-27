interface LoginDto {
  email: string;
  password: string;
}

class User {
  id!: string;
  email!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  role!: Role;
  nickname = (): string => {
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
  };
}
