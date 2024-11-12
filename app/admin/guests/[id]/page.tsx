"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useGuestDetails } from "./guest-details.hook";
import FullScreenLoading from "@/app/components/FullScreenLoading";
import Header from "@/app/components/Header";
import { GetReservationType, ReservationType } from "@/app/models/enums";
import { CheckBoxOutlineBlank, CheckBoxOutlineBlankRounded, ContentCopy, CopyAll, Email, EventSeat, LinkOff, Person, Phone, Share } from "@mui/icons-material";
import { Checkbox, Link } from "@mui/material";

function GuestDetails() {
  const hook = useGuestDetails();

  return (
    <Header title="Guest">
      {hook.state.isLoading ? (
        <FullScreenLoading message="Fetching guest..." />
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
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
              <div>
                <Email className="mr-4" /> {hook.state.guest!.email ?? "-"}
              </div>
              <div>
                <Phone className="mr-4" /> {hook.state.guest!.phoneNumber ?? "-"}
              </div>
              <div>{hook.state.guest!.reserved ? "Reserved" : "Not Reserved"}</div>
            </div>
            <button className="bg-red-500 text-white hover:bg-red-400" onClick={() => hook.deleteGuest()}>
              Delete Guest
            </button>
          </div>
          <div className="flex flex-col gap-3 bg-background p-4 basis-3/5 rounded-2xl">
            <div className="flex items-center">
              <Share className="mr-4" /> <div className="">{hook.state.qrLink}</div> <ContentCopy className="ml-4" />
            </div>
            <div className="m-3 self-center" ref={hook.qrRef} />
          </div>
        </div>
      )}
    </Header>
  );
}

export default GuestDetails;
