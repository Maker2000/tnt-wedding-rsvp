"use client";
import React, { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string | Date;
  title?: string;
};

function Countdown({ targetDate, title }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  const data = () => [
    { data: timeLeft.days, title: "Days" },
    { data: timeLeft.hours, title: "Hours" },
    { data: timeLeft.minutes, title: "Minutes" },
    { data: timeLeft.seconds, title: "Seconds" },
  ];
  return (
    <div>
      {title == null ? null : <div className="text-3xl font-shadows-into-light font-bold mb-2">{title}</div>}
      <div className="flex justify-center text-center text-2xl font-mono ">
        {data().map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center border-l-[0.1rem] border-black px-4 py-2 last:border-r-[0.12rem] border-t-[0.1rem] border-b-[0.1rem]">
            <span className="text-4xl font-bold">{String(item.data).padStart(2, "0")}</span>
            <span className="text-sm uppercase">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Countdown;
