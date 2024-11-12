import React from "react";
import Image from "next/image";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-5 text-center">
      <Logo size={300} />
      <h1 className="flex flex-col text-4xl font-bold font-shadows-into-light gap-2">
        <div>We're</div>
        <div>Getting MARRIED</div>
      </h1>
      <div className="font-shadows-into-light text-5xl">T & T</div>
    </div>
  );
}