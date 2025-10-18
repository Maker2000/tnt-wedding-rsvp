"use client";
import React, { ReactElement, useState } from "react";
import Logo from "../../components/Logo";
import Carousel from "../../components/Carousel";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { CalendarMonth, Close, MenuBook, MyLocationSharp, Place, Timelapse, Timer } from "@mui/icons-material";
import Countdown from "../../components/Countdown";
import { Menu } from "@mui/material";
import Separator from "../../components/Separator";
import { weddingDate } from "@/lib/constants";

export default function Home() {
  return (
    <div id="home" className="flex flex-col justify-stretch gap-20 text-center overflow-y-scroll">
      <Navbar />
      {/* <div className="pt-4 ml-4 text-left">
        <Logo size={100} />
      </div> */}
      <div className="pt-40"></div>
      <h1 className="flex flex-col gap-2">
        <div className="text-5xl font-shadows-into-light font-bold ">Terrence & Rochelle</div>
        <div className="text-xl">Are Getting Married</div>
      </h1>
      <Separator />
      <Countdown targetDate={weddingDate} title="Wedding Countdown" />
      <Separator />

      <div id="how-we-met" className="flex flex-col w-11/12 md:w-8/12 text-left justify-center self-center gap-3">
        <div className="font-shadows-into-light text-3xl font-bold">How We Met</div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="font-shadows-into-light text-xl font-bold">Groom</div>I met Rochelle on Facebook in 2015. I actually mistook her for an old
            classmate of mine. It was when I mentioned something related to my old high school that she didn't relate to that I realized she wasn't the person I
            thought she was. We continued talking because, to me, I had made a new friend. It wasn't until a few months into knowing and talking to her that I
            fell for her. I was smitten by her beauty, her intelligence, and her kindness. I knew she was the one for me, and I started a long 8-month pursuit
            for her. She eventually agreed to be my person, and the rest is history.
          </div>
          <div>
            <div className="font-shadows-into-light text-xl font-bold">Bride</div>
            <div className="flex flex-col gap-2">
              <div>
                If you've ever wondered what happens when a Facebook message turns into forever, here is the story. The real story. It started in July 2015 when
                I got a message from someone named Terrence Signature Band Matthews (Yes, that was his real Facebook name 🙄). Come on, was I being approached
                by a full gospel fusion band?
              </div>
              <div className="italic">
                His opening line? “Hello”
                <br />
                No context, no follow-up, just “hello.”
                <br />
                We started chatting. Easy, normal conversation. I assumed he knew who I was. I mean, he messaged me, right? Besides, I knew who he was. Then
                September, just two months after us talking, he drops “you're a former Knoxite after all.”
              </div>
              <div>
                Except, I wasn't. I never went to Knox. That's when I realized this man had no idea who I actually was. He had mistaken me for someone else the
                whole time, while I was here thinking we shared a past.
                <br />
                It didn't matter. By then, we were already vibing. He was sweet, funny, and OBVIOUSLY smitten. He couldn’t back out even if he tried. Then came
                March 2016. The official beginning of the pursuit. That's when he stepped up. He was intentional, consistent, and real. He showed me exactly who
                he was.
                <br />
                Eight months later, I said yes to being his girlfriend.
                <br />
                And now I'm saying yes to being his wife.
                <br />
                So no, I didn't go to that school, but I'm graduating into forever with him now.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div id="groom" className="flex flex-col w-11/12 md:w-8/12 text-left justify-center self-center">
        <div id="love-story" className="font-shadows-into-light text-3xl font-bold text-center pb-4">
          Love Story
        </div>
        <div className="font-shadows-into-light text-3xl font-bold">Terrence</div>
        <div className="font-shadows-into-light text-2xl">the Groom</div>
        <div className="mt-3">
          It's been an absolute pleasure knowing Rochelle. She is the love of my life, that I'm confident about. I love her to bits, and now that we are getting
          married, I'm ecstatic to see where life takes us as we work as one unit to accomplish our goals and live a life that glorifies God.
        </div>
      </div>
      <div id="bride" className="flex flex-col w-11/12 md:w-8/12 md:text-left text-right justify-center self-center">
        <div className="font-shadows-into-light text-3xl font-bold">Rochelle</div>
        <div className="font-shadows-into-light text-2xl">the Bride</div>
        <div className="mt-3">
          From the beginning, loving Terrence has felt natural, grounding, and full of joy. He is the love of my life, the calm to my storm, and the laughter in
          my soul. As we prepare to step into marriage, my heart is full. I'm confident in our friendship, and our future. I love him without hesitation. I
          can't wait for us to build an incredible life together.
        </div>
      </div>
      <Separator />
      <div id="photos">
        <div className="font-shadows-into-light text-3xl font-bold">Photos</div>
        <Carousel folder="carousel/photo-shoot" prefix="shoot" ext="JPG" count={17} />
      </div>
    </div>
  );
}

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#how-we-met", label: "How We Met" },
  { href: "#love-story", label: "Love Story" },
  { href: "#photos", label: "Photos" },
  // Add more links as needed
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-background backdrop-blur shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
        <div className="text-2xl font-bold font-shadows-into-light">
          <Logo size={60} />
        </div>
        {/* Desktop links */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline font-semibold">
              {link.label}
            </Link>
          ))}
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden p-2 bg-transparent transition" onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation">
          {open ? <Close /> : <MenuIcon />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden  px-4 pb-4 flex flex-col gap-4 shadow">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:underline font-semibold" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
