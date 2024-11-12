import React, { ReactNode } from "react";

function Header({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <div className="bg-background top-0 z-10 fixed text-3xl p-8 w-full h-24">{title}</div>
      <div className="mt-24 mb-24 sm:mb-0 p-4 h-full overflow-scroll">{children}</div>
    </div>
  );
}

export default Header;
