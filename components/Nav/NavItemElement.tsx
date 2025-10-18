"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { NavItem } from "./data";

function NavItemElement({ item }: { item: NavItem }) {
  const pathName = usePathname();
  return (
    <Link className={`flex flex-col items-center${pathName.includes(item.route) ? " text-primary" : ""}`} href={`${item.route}`}>
      {item.icon}
      <div className="text-xs mt-1">{item.title}</div>
    </Link>
  );
}
export default NavItemElement;
