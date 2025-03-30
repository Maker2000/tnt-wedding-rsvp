"use client";
import FullScreenLoading from "@/app/components/FullScreenLoading";
import Logo from "@/app/components/Logo";
import React from "react";
import { useGuestWelcomeHook } from "./welcome.hook";
import { AttendanceResponse } from "@/app/models/enums";

const Welcome = () => {
  const hook = useGuestWelcomeHook();
  return (
    <>
      <FullScreenLoading isLoading={hook.state.isLoading} message="Loading..." />

      <div className="h-screen p-3 items-center justify-center flex">
        <div className="flex p-12 h-full text-center overflow-y-scroll flex-col gap-4 bg-background w-full md:w-3/6 lg:w-2/5 items-center self-center justify-self-center">
          {hook.state.hasError ? (
            <div>{hook.state.errorMessage}</div>
          ) : hook.state.response == AttendanceResponse.declined ? (
            <div>Thank you for responding</div>
          ) : (
            <>
              <Logo size={200} />
              <div className="flex gap-3 items-center">
                <div className="text-4xl">Terrence Matthews</div>
                <div className="text-lg">&</div>
                <div className="text-4xl">Rochelle Henry</div>
              </div>
              <div>Invite you to join them in the celebration of their marriage</div>
              <div>@</div>
              <div>place/venue</div>
              <div>ON</div>
              <div>December 13ᵗʰ, 2025</div>
              <div>2:00pm</div>
              <div>RSVP by: October 13ᵗʰ, 2025</div>

              {hook.state.response == AttendanceResponse.unanswered ? (
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
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Welcome;
