"use client";
import React, { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string | Date;
  title?: string;
  todayMessage?: string;
  passedMessage?: string;
};

function Countdown({ targetDate, title, todayMessage, passedMessage }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [status, setStatus] = useState<"upcoming" | "today" | "passed">("upcoming");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    function updateCountdown() {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target.getTime() - now.getTime();
      const days = Math.floor(Math.max(0, diff) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((Math.max(0, diff) / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((Math.max(0, diff) / (1000 * 60)) % 60);
      const seconds = Math.floor((Math.max(0, diff) / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });

      // Status logic
      const nowDate = now.toDateString();
      const targetDateStr = target.toDateString();
      if (nowDate === targetDateStr) {
        setStatus("today");
        if (interval) clearInterval(interval);
      } else if (now > target) {
        setStatus("passed");
        if (interval) clearInterval(interval);
      } else {
        setStatus("upcoming");
      }
    }
    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
    return () => interval && clearInterval(interval);
  }, [targetDate]);

  const data = () => [
    { data: timeLeft.days, title: timeLeft.days != 1 ? "Days" : "Day\u200A" },
    { data: timeLeft.hours, title: timeLeft.hours != 1 ? "Hours" : "Hour\u200A" },
    { data: timeLeft.minutes, title: timeLeft.minutes != 1 ? "Minutes" : "Minute\u200A" },
    { data: timeLeft.seconds, title: timeLeft.seconds != 1 ? "Seconds" : "Second\u200A" },
  ];
  return (
    <div>
      {title != null && <div className="text-3xl font-shadows-into-light text-center font-bold mb-2">{title}</div>}
      {status === "today" && <div className="text-5xl font-shadows-into-light font-bold my-2">{todayMessage ?? "Today is the big day! 🎉"}</div>}
      {status === "passed" && (
        <div className="text-5xl font-bold my-2">{passedMessage ?? "The event has passed. Thank you for being part of our special day!"}</div>
      )}
      {status === "upcoming" && (
        <div className="flex justify-center text-center text-2xl font-mono ">
          {data().map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center border-l-[0.1rem] border-black px-4 py-2 last:border-r-[0.12rem] border-t-[0.1rem] border-b-[0.1rem]">
              <span className="text-4xl font-bold">{String(item.data).padStart(2, "0")}</span>
              <span className="text-sm font-semibold uppercase">{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Countdown;
