import React from "react";
import Image from "next/image";
function Logo({ size, leaf = true }: { size: number; leaf?: boolean }) {
  return (
    <div>
      <Image src={leaf ? "/ourLogo.svg" : "/ourLogo-no-leaf.svg"} alt="logo" width={size} height={size} className="bg-white  p-1 rounded-full" />
    </div>
  );
}

export default Logo;
