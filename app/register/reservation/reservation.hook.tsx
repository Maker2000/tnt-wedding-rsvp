import { FormEvent, useEffect, useState } from "react";
import { loadGuestCookie } from "@/lib/server-functions";
import { isEmptyInputValue } from "@/lib/util";
import { IGuest } from "@/app/models/guest";
import { AttendanceResponse, InvitedBy, ReservationType } from "@/app/models/enums";
import { GuestService } from "@/app/services/guest.service";
import { redirect } from "next/navigation";

export const useReservationHook = () => {
  const [dto, setDto] = useState<IGuest>();
  const [state, setState] = useState({ isLoading: true, errorMessage: "", hasError: false, loadingMessage: "Loading User Data...", reserved: false });
  const setLoading = (value: boolean) => {
    setState((x) => ({ ...x, isLoading: value }));
  };

  useEffect(() => {
    setState((x) => ({ ...x, reserved: dto?.response == AttendanceResponse.attending }));
  }, [dto?.response]);
  const reserve = async (e: FormEvent<HTMLFormElement>) => {
    if (!dto) {
      setState((x) => ({ ...x, hasError: true, errorMessage: "Error occured, please refresh the page" }));
      return;
    }
    setState((x) => ({ ...x, isLoading: true, loadingMessage: "Reserving..." }));
    e.preventDefault();
    const res = await GuestService.reserveInvite(dto!); // HttpClient.putData<ApiResponseData, IGuest>(`/api/guest/${dto!.id}`, { ...dto!, response: AttendanceResponse.attending });
    if (res.hasError()) {
      setState((x) => ({
        ...x,
        isLoading: false,
        loadingMessage: "Reserving...",
        hasError: true,
        errorMessage: res.error?.message ?? "Unknown error occured.",
      }));
    } else {
      setState((x) => ({
        ...x,
        reserved: true,
        isLoading: false,
        loadingMessage: "Reserving...",
        hasError: false,
        errorMessage: "",
      }));
      redirect("/register/welcome");
    }
  };
  const decline = async (e: FormEvent<HTMLFormElement>) => {
    if (!dto) {
      setState((x) => ({ ...x, hasError: true, errorMessage: "Error occured, please refresh the page" }));
      return;
    }
    setState((x) => ({ ...x, isLoading: true, loadingMessage: "Reserving..." }));
    e.preventDefault();
    const res = await GuestService.declineInvite(dto!);
    setState((x) => ({
      ...x,
      isLoading: false,
      loadingMessage: "Declining...",
      hasError: true,
      errorMessage: res.error?.message ?? "Unknown error occured.",
    }));
  };
  const getUserData = async () => {
    setLoading(true);
    const res = await loadGuestCookie();
    if (res) {
      const guest = await GuestService.getGuest(res.id);
      if (!guest.hasError()) {
        setDto((x) => (x = guest.data!));
        setState((x) => ({ ...x, hasError: false, errorMessage: "" }));
      } else {
        setDto((x) => undefined);
        setState((x) => ({ ...x, hasError: true, errorMessage: guest.error!.message }));
      }
    } else {
      setState((x) => ({ ...x, hasError: true, errorMessage: "Unable to validate your user. Please contact the issuer of your url for a new one" }));
    }

    setLoading(false);
  };
  const canReserve = () => {
    return (
      !isEmptyInputValue(dto?.firstName) &&
      !isEmptyInputValue(dto?.lastName) &&
      !isEmptyInputValue(dto?.invitedBy) &&
      !state.reserved &&
      (dto?.reservationType == ReservationType.plusOne ? !isEmptyInputValue(dto?.plusOne?.firstName) && !isEmptyInputValue(dto?.plusOne?.lastName) : true)
    );
  };
  const removeError = () => {
    setState((x) => ({ ...x, hasError: false }));
  };
  const setFirstName = (value: string) => {
    if (dto != undefined) setDto((x) => ({ ...x!, firstName: value }));
  };
  const setLastName = (value: string) => {
    if (dto != undefined) setDto((x) => ({ ...x!, lastName: value }));
  };
  const setInvitedBy = (value: string) => {
    if (dto != undefined) setDto((x) => ({ ...x!, invitedBy: value as InvitedBy }));
  };
  const setEmail = (value: string) => {
    if (dto != undefined) setDto((x) => ({ ...x!, email: value }));
  };
  const setPhoneNumber = (value: string) => {
    if (dto != undefined) setDto((x) => ({ ...x!, phoneNumber: value }));
  };
  const setPlusOneFirstName = (value: string) => {
    if (dto != undefined) setDto((x) => ({ ...x!, plusOne: { ...x!.plusOne!, firstName: value } }));
  };
  const setPlusOneLastName = (value: string) => {
    if (dto != undefined) setDto((x) => ({ ...x!, plusOne: { ...x!.plusOne!, lastName: value } }));
  };
  return {
    reserve,
    getUserData,
    dto,
    state,
    canReserve,
    setEmail,
    setFirstName,
    setLastName,
    setInvitedBy,
    setPhoneNumber,
    setPlusOneFirstName,
    setPlusOneLastName,
    decline,
    removeError,
  };
};
