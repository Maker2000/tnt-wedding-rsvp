import Link from "next/link";
import React, { ReactElement } from "react";

function NavLink({ page, onClick, children }: { page?: string; onClick?: React.MouseEventHandler<HTMLDivElement>; children: ReactElement }) {
  let classNames = "hover:text-black hover:bg-accent p-3";
  return page ? (
    <Link className={classNames} href={page}>
      {children}
    </Link>
  ) : (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
}

export default NavLink;
