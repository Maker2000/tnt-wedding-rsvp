"use client";
import { ReservationType } from "@/app/models/enums";
import { CreateGuestDto, GuestQrUrlResponse } from "@/app/models/guest";
import { HttpClient } from "@/lib/http-client";
import { FormEvent, useState } from "react";

export const useGenerateInviteHook = () => {
  const [dto, setDto] = useState<CreateGuestDto>({
    firstName: "",
    lastName: "",
  });
  const [state, setState] = useState({ isLoading: false, qrCodeGenerated: false, qrUrl: "", errorMessage: "" });

  const generateGuestInvite = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    let res = await HttpClient.postData<GuestQrUrlResponse, CreateGuestDto>("/api/admin/generate-guest-qr", dto);
    if (res.hasError()) {
      setState(
        (x) =>
          (x = {
            ...x,
            errorMessage: res.error!.message,
            qrCodeGenerated: false,
            qrUrl: "",
          })
      );
    } else {
      setState(
        (x) =>
          (x = {
            ...x,
            errorMessage: "",
            qrCodeGenerated: true,
            qrUrl: res.data!.url,
          })
      );
    }
    setIsLoading(false);
  };
  const canGenerateCode = (): boolean => {
    return dto.firstName != "" && dto.lastName != "" && dto.reservationType != null;
  };
  const setFirstName = (value: string) => {
    setDto(
      (x) =>
        (x = {
          ...x,
          firstName: value,
        })
    );
  };
  const setLastName = (value: string) => {
    setDto(
      (x) =>
        (x = {
          ...x,
          lastName: value,
        })
    );
  };
  const setReservationType = (value: ReservationType) => {
    setDto(
      (x) =>
        (x = {
          ...x,
          reservationType: value,
        })
    );
  };
  const setIsLoading = (value: boolean) => {
    setState(
      (x) =>
        (x = {
          ...x,
          isLoading: value,
        })
    );
  };

  return {
    generateGuestInvite,
    dto,
    setReservationType,
    setFirstName,
    setLastName,
    canGenerateCode,
    state,
  };
};
