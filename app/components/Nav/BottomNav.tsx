import { Dashboard, Person, Verified } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import NavItemElement from "./NavItemElement";
import { navItems } from "./data";

function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-row justify-around pb-4 sm:hidden bg-background h-20 pt-4">
      {navItems.map((x, i) => (
        <NavItemElement key={i} item={x} />
      ))}
    </div>
  );
}

export default BottomNav;
