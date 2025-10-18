"use client";
import InputField, { InputDropdown } from "@/components/InputField/InputField";
import { ReservationType } from "@/app/models/enums";
import React, { useEffect, useRef } from "react";
import { useGenerateInviteHook } from "./generate-invite.hook";
import Header from "@/components/Header";
import { CircularProgress } from "@mui/material";
import QRCodeStyling from "qr-code-styling";
import { Guest } from "@/app/models/guest.mongoose";
import GuestQRCode from "@/components/GuestQRCode";
let qrCode: QRCodeStyling;
function GenerateInvite() {
  const hook = useGenerateInviteHook();

  const qrRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      qrCode = new QRCodeStyling({
        // width: 500,
        // height: 500,
        image: "/ourLogo-no-leaf.svg",
        dotsOptions: {
          color: "#ecb5bc",
          type: "dots",
        },
        cornersDotOptions: {
          color: "#387e80",
          type: "dot",
        },
        cornersSquareOptions: {
          color: "#387e80",
          type: "extra-rounded",
        },
        backgroundOptions: {
          color: "#fff",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 0,
          // imageSize: 0.2,
        },
      });
      qrCode.append(qrRef.current ?? undefined);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined")
      qrCode.update({
        data: hook.state.qrUrl,
      });
  }, [hook.state]);
  return (
    <Header title="Generate Invite QR">
      <div className="flex flex-col w-full max-w-3xl p-5">
        <form onSubmit={hook.generateGuestInvite} className="flex w-full flex-col gap-3 ">
          <InputField type="text" title="First Name" id="firstName" onDataChange={hook.setFirstName} />
          <InputField type="text" title="Last Name" id="lastName" onDataChange={hook.setLastName} />
          <InputDropdown
            onItemSelect={(e) => {
              hook.setReservationType(e as ReservationType);
            }}
            type="text"
            title="Reservation Type"
            id="lastName"
            items={[ReservationType.plusOne, ReservationType.single]}
          />
          {hook.state.isLoading ? (
            <CircularProgress className="self-center text-primary m-2" thickness={3} size={50} />
          ) : (
            <input type="submit" disabled={!hook.canGenerateCode()} value="Generate QR Code" />
          )}
        </form>
        <div className="text-red-500">{hook.state.errorMessage}</div>
        {hook.state.qrCodeGenerated ? (
          <GuestQRCode qrLink={hook.state.qrUrl} guestName={hook.dto.firstName + " " + hook.dto.lastName} />
        ) : // <div className="flex flex-row justify-around w-full">
        //   <button
        //     onClick={(e) => {
        //       e.preventDefault();
        //       qrCode.download();
        //     }}>
        //     Download QR Code
        //   </button>
        //   <button>Copy Link</button>
        // </div>
        null}
      </div>
    </Header>
  );
}

export default GenerateInvite;
