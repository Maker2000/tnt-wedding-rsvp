import React from "react";
import Logo from "./Logo";

function Separator() {
  return (
    <div className="flex items-center justify-center px-4 w-full">
      <div className="w-full h-[1px] bg-gray-300 my-4"></div>
      <div className="p-3">
        <Logo size={70} leaf={false} />
      </div>
      <div className="w-full h-[1px] bg-gray-300 my-4"></div>
    </div>
  );
}

export default Separator;
