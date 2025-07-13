"use client";
import React, { useEffect } from "react";
import { useGuestDetails } from "./guest-details.hook";
import FullScreenLoading from "@/app/components/FullScreenLoading";
import Header from "@/app/components/Header";
import { GetReservationType, ReservationType } from "@/app/models/enums";
import { ContentCopy, Download, EventSeat, Person, Share } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import GuestQRCode from "@/app/components/GuestQRCode";

function GuestDetails() {
  const hook = useGuestDetails();

  return (
    <Header title="Guest">
      {hook.state.isLoading ? (
        <FullScreenLoading isLoading={hook.state.isLoading} message={hook.state.loadingMessage} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col gap-3 bg-background p-4 basis-2/5 rounded-2xl justify-between">
            <div>
              <div className="text-2xl font-semibold">
                {hook.state.guest!.firstName} {hook.state.guest!.lastName}
              </div>
              <div className="flex justify-between">
                <div>
                  <EventSeat className="mr-4" /> {GetReservationType(hook.state.guest!.reservationType)} Reservation
                </div>
                {hook.state.guest!.reservationType == ReservationType.plusOne ? (
                  <div>
                    <Person className="mr-4" /> {hook.state.guest!.plusOne?.firstName ?? "-"} {hook.state.guest!.plusOne?.lastName ?? ""}
                  </div>
                ) : null}
              </div>
              <div>Status: {hook.state.guest!.response}</div>
            </div>
            <button className="bg-red-500 text-white hover:bg-red-400" onClick={() => hook.deleteGuest()}>
              Delete Guest
            </button>
          </div>
          <div className="flex flex-col gap-3 bg-background p-4 basis-3/5 rounded-2xl">
            <GuestQRCode qrLink={hook.state.qrLink} guestName={hook.state.guest!.firstName + " " + hook.state.guest!.lastName} />
          </div>
        </div>
      )}
    </Header>
  );
}

export default GuestDetails;
