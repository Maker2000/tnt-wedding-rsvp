import { FormEvent, useEffect, useState } from "react";
import { IGuest } from "../models/guest";
import { loadGuestCookie } from "@/lib/server-functions";
import { HttpClient } from "@/lib/http-client";
import { ApiResponseData } from "../api/exception-filter";
import { isEmptyInputValue } from "@/lib/util";
import { InvitedBy, ReservationType } from "../models/enums";

export const useReservationHook = () => {
  const [dto, setDto] = useState<IGuest>();
  const [state, setState] = useState({ isLoading: true, errorMessage: "", hasError: false, loadingMessage: "Loading User Data...", reserved: false });
  const setLoading = (value: boolean) => {
    setState((x) => ({ ...x, isLoading: value }));
  };
  useEffect(() => {
    setState((x) => ({ ...x, reserved: dto?.reserved ?? false }));
  }, [dto?.reserved]);
  const reserve = async (e: FormEvent<HTMLFormElement>) => {
    if (!dto) {
      setState((x) => ({ ...x, hasError: true, errorMessage: "Error occured, please refresh the page" }));
      return;
    }
    setState((x) => ({ ...x, isLoading: true, loadingMessage: "Reserving..." }));
    e.preventDefault();
    let res = await HttpClient.putData<ApiResponseData, IGuest>(`/api/guest/${dto!.id}`, { ...dto!, reserved: true });
    setState((x) => ({
      ...x,
      isLoading: false,
      loadingMessage: "Reserving...",
      hasError: true,
      errorMessage: res.error?.message ?? res.data?.message ?? "Unknown error occured.",
    }));
  };
  const getUserData = async () => {
    setLoading(true);
    let res = await loadGuestCookie();
    if (res) {
      let guest = await HttpClient.getData<IGuest>(`/api/guest/${res.id}`);
      console.log(guest);
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
  };
};
