"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../components/Logo";
import "./../save-the-date.css";
function SaveTheDate() {
  let [clicked, setClicked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 text-center overflow-scroll">
      {/* <div>Save the date</div> */}

      <div
        className={`relative flex justify-center aspect-[3/2] h-80 z-0 bg-accent ${clicked ? "" : "dance-animation"} wrapper`}
        onClick={() => {
          if (!clicked) setClicked(true);
        }}
        tabIndex={-1}>
        <img className="lid one" src="/envelope-flap-1.png" alt="" />
        <div className="lid one lid-one-logo">
          <Logo leaf={false} size={80} />
        </div>
        <div className="lid two flex items-center justify-center">
          <div className="lid-two-logo"></div>
        </div>
        <img className="lid two" src="/envelope-flap-2.png" alt="" />
        <img className="envelope" src="/envelope-front.png" alt="" />
        <img className="" src="/envelope-inner.png" alt="" />
        <div className={`absolute z-[2] top-0 transition-all duration-500 letter ${clicked ? "letter-focus" : ""}`}>
          <div className="flex flex-col items-center font-bold gap-4 p-8 save-the-date-card-content rounded-xl">
            <div className="text-xl italic">“… A three fold cord is not quickly broken” - Ecclesiastes 4:12</div>
            <div className="text-4xl">Save the date!</div>
            <div className="h-96"></div>
            <div className="h-8"></div>
            <div className="text-4xl font-shadows-into-light">Terrence & Rochelle are tying the knot!</div>
            <div className="text-2xl">Saturday December 13th, 2025</div>
            <div className="">#MakingItMatthews</div>
            <div className="">
              <Logo size={75} />
            </div>
            <div className="text-md">The formal invitation will follow</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveTheDate;
