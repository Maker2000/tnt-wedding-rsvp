import React from "react";
import { useProgramHook } from "./program.hook";
import Separator from "@/components/Separator";
import GuestQRCode from "@/components/GuestQRCode";
function Program() {
  var hook = useProgramHook();
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div className="flex flex-col  text-center gap-3 pt-80 px-5">
        <div className="text-2xl font-bold">THE SOLEMNIZATION OF HOLY MATRIMONY</div>
        <div className="font-bold">Between</div>
        <div className="text-xl font-bold">ROCHELLE ANNIKIE HENRY</div>
        <div className="font-bold">&</div>
        <div className="text-xl font-bold">TERRENCE JUNIOR MATTHEWS</div>
        <div className="font-bold">On</div>
        <div className="text-xl font-bold">SATURDAY, DECEMBER 13, 2025</div>
        <div className="font-bold">At</div>
        <div className="text-xl font-bold">2:00 p.m.</div>
        <div className="text-2xl font-bold">THE CEREMONY & RECEPTION</div>
        <div className="font-bold">At</div>
        <div className="text-xl font-bold">JAMGOLIA PLACE</div>
        <div className="text-xl font-bold">12A KENDAL ROAD, INGLESIDE, MANDEVILLE</div>
      </div>
      <Separator py="py-40" />
      <div className="flex flex-col gap-12 px-4">
        {hook.sections.map((item, index) => (
          <div key={`section-wrapper-${index}`}>
            <div className="" key={`section-${index}`}>
              <div className="uppercase pb-8 text-center text-xl font-bold">{item.title}</div>
              <div className="flex flex-col gap-6">
                {item.content.map((item, index) => (
                  <div className={`flex ${item.center ? "justify-center" : "justify-between"}`} key={`element-${index}`}>
                    <div className="flex flex-col">
                      <div className={`font-bold ${item.skipTitling ? "" : "program-title"}`}>{item.title}</div>
                      {item.subtitle && <div className="italic text-sm">{item.subtitle}</div>}
                    </div>
                    {item.content && <div className="text-right">{item.content}</div>}
                  </div>
                ))}
              </div>
            </div>
            <Separator key={`separator-${index}`} py="py-40" />
          </div>
        ))}
      </div>
      <div className="mb-40">
        <div className="uppercase pb-3 text-center text-xl font-bold">Praise AND WORSHIP SONGS</div>
      </div>
      <div>
        <div className="uppercase pb-3 text-center text-xl font-bold">WE'VE COME THIS FAR BY FAITH</div>
        We've come this far by faith
        <br />
        Leaning on the Lord
        <br />
        Trusting in His holy word
        <br />
        He never fail me yet
        <br />
        Oh, oh, oh, oh, oh, oh
        <br />
        No turning around
        <br />
        We've come this far by faith
        <br />
        <br />
        <div className="uppercase pb-3  text-xl font-bold">I WILL TRUST IN THE LORD</div>
        I will trust in the Lord (x3)
        <br />
        Till I die
        <br />
        I will trust in the Lord (x3)
        <br />
        Till I die
        <br />
        I'm gonna stay on the battle field (x3)
        <br />
        Till I die
        <br />
        I'm gonna stay on the battle field (x3)
        <br />
        Till I die
        <br />
        I'm gonna treat everybody right (x3)
        <br />
        Till I die
        <br />
        I'm gonna treat everybody right (x3)
        <br />
        Till I die
        <br />
      </div>
    </div>
  );
}

export default Program;
