import React from "react";
import Logo from "../components/Logo";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 text-center">
      <Logo size={300} />
      <h1 className="flex flex-col text-4xl font-bold font-shadows-into-light gap-2">
        <div>We're</div>
        <div>Getting Married</div>
      </h1>
      <div className="font-shadows-into-light text-5xl">T & R</div>
      <Carousel folder="carousel/photo-shoot" prefix="shoot" count={17} />
    </div>
  );
}
