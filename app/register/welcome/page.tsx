"use client";
import FullScreenLoading, { Loading } from "@/app/components/FullScreenLoading";
import Logo from "@/app/components/Logo";
import React from "react";
import { useGuestWelcomeHook } from "./welcome.hook";
import { AttendanceResponse } from "@/app/models/enums";
import { Place, Timer } from "@mui/icons-material";
import Countdown from "@/app/components/Countdown";
import { GuestDisplay } from "@/app/models/guest";
import Separator from "@/app/components/Separator";
import { format } from "date-fns";

const Welcome = () => {
  const hook = useGuestWelcomeHook();
  const donationsAndGifts = (additionalInformation?: string) => (
    <div>
      <div className="text-3xl uppercase pt-1">Donations / Gifts</div>
      <div>{additionalInformation} Find the banking details below</div>
      <div className="pt-3">
        First name: TERRENCE
        <br />
        Last name: MATTHEWS
        <br />
        Bank name: Scotiabank
        <br />
        Account type: SAVINGS
        <br />
        Account number: 90605 000881018
      </div>
      <div className="pt-3">We are deeply grateful for your love and support as we begin this new chapter together.</div>
    </div>
  );
  return (
    <>
      <FullScreenLoading isLoading={hook.state.isLoading} message="Loading..." />

      <div className="flex p-12 h-full text-center overflow-y-scroll flex-col gap-16 justify-stretch items-center self-center justify-self-center">
        {hook.state.hasError ? (
          <div>{hook.state.errorMessage}</div>
        ) : hook.currentGuest?.response == AttendanceResponse.declined ? (
          <>
            <div>
              <div className="text-3xl">Thank you for responding</div>
              <div>Your monetary support is greatly appreciated.</div>
            </div>

            <Separator />
            {donationsAndGifts()}
          </>
        ) : (
          <>
            <Logo size={150} />
            <div>
              <div className="flex flex-col justify-stretch font-bold font-shadows-into-light pb-5">
                <div className="text-5xl">Terrence</div>
                <div className="text-3xl">&</div>
                <div className="text-5xl">Rochelle</div>
              </div>
              <div className="text-lg">Invite you, {hook.currentGuest?.firstName}, to share in the joy of their wedding day.</div>
            </div>
            <Separator />
            <div>
              <div className="text-3xl pb-3">Saturday, December 13ᵗʰ, 2025</div>
              <Countdown targetDate={new Date(2025, 12, 13, 14, 0, 0)} />
            </div>
            <Separator />
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3793.257718487454!2d-77.50562029999999!3d18.059620199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edbbe50c15ba427%3A0x70627c184080aa80!2sJamGolia%20Place!5e0!3m2!1sen!2sjm!4v1751332284289!5m2!1sen!2sjm"
                className="border-0 w-full h-96 pb-3"
                loading="lazy"></iframe>
              <a
                href={hook.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary font-semibold shadow hover:bg-primary-hover transition cursor-pointer mt-2">
                <Place fontSize="small" /> {hook.address}
              </a>
            </div>
            <Separator />
            {hook.eventInfo.map((x, index) => (
              <div key={index}>
                <div className="text-3xl uppercase pb-1">{x.title}</div>
                <div className="text-xl">
                  <Timer /> {x.time}
                </div>
                {x.additionalInformation ? <div>{x.additionalInformation}</div> : null}
              </div>
            ))}
            <Separator />
            <div className="font-bold text-lg">Please RSVP before: {format(hook.cutoffDate, "EEEE, MMMM do, yyyy")} </div>
            <Separator />
            {donationsAndGifts("Monetary gifts are preferred.")}
            {hook.state.isLoading ? (
              <>
                <Loading message={hook.state.loadingMessage} />
              </>
            ) : hook.currentGuest?.response == AttendanceResponse.unanswered && !hook.isCutoffDatePassed() ? (
              <>
                <div className="text-2xl pt-8">Please RSVP below</div>
                <div className="flex gap-8 pt-12">
                  <button
                    onClick={() => {
                      hook.reserve();
                    }}>
                    Accept with pleasure
                  </button>
                  <button
                    onClick={() => {
                      hook.decline();
                    }}>
                    Decline with regret
                  </button>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default Welcome;
