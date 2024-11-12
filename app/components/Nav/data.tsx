import { Dashboard, Person, QrCode, Settings, Verified } from "@mui/icons-material";
import { ReactNode } from "react";

export interface NavItem {
  icon: ReactNode;
  route: string;
  title: string;
}
export const navItems: Array<NavItem> = [
  {
    icon: <Dashboard />,
    route: "/dashboard",
    title: "Dashboard",
  },
  {
    icon: <Person />,
    route: "/guests",
    title: "Guests",
  },
  {
    icon: <QrCode />,
    route: "/generate-invite",
    title: "Invite Code",
  },
  {
    icon: <Settings />,
    route: "/settings",
    title: "Settings",
  },
];
