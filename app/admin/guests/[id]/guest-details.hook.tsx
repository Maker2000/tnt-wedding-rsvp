"use client";

import { IGuest } from "@/app/models/guest";
import { HttpClient } from "@/lib/http-client";
import { useParams } from "next/navigation";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
const qrCode = new QRCodeStyling({
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
export const useGuestDetails = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{ isLoading: boolean; errorMessage: string; hasError: boolean; qrLink: string; guest?: IGuest | null }>({
    isLoading: true,
    errorMessage: "",
    hasError: false,
    qrLink: "",
  });

  const id = useParams()["id"];
  const deleteGuest = () => {};
  const getGuest = async () => {
    setState((x) => (x = { ...x, isLoading: true }));
    let res = await HttpClient.getData<IGuest>(`/api/guest/${id}`);
    if (res.hasError()) {
      setState((x) => (x = { ...x, isLoading: false, errorMessage: res.error!.message, hasError: true, qrLink: "", guest: null }));
      return;
    } else {
      setState(
        (x) =>
          (x = {
            ...x,
            isLoading: false,
            errorMessage: "",
            hasError: false,
            guest: res.data!,
            qrLink: `${window.location.origin}/register-guest?token=${id}`,
          })
      );
    }
  };
  useEffect(() => {
    qrCode.append(qrRef.current ?? undefined);
    getGuest();
  }, []);

  useEffect(() => {
    qrCode.append(qrRef.current ?? undefined);
    qrCode.update({
      data: state.qrLink,
    });
  }, [state.qrLink]);
  return { deleteGuest, state, qrRef };
};
