import React from "react";
import NavItemElement from "./NavItemElement";
import Logo from "../Logo";
import Link from "next/link";
import { navItems } from "./data";
import Divider from "@mui/material/Divider";

function SideNav() {
  return (
    <div className="fixed bg-background left-0 top-0 h-full w-20 sm:flex flex-col hidden gap-8 pt-6 items-center">
      <Link href={"/admin/dashboard"}>
        <Logo size={54} leaf={false} />
      </Link>
      {navItems.map((x, i) => (
        <NavItemElement key={i} item={x} />
      ))}
    </div>
  );
}

export default SideNav;
