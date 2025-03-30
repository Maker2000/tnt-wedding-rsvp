import { AttendanceResponse } from "@/app/models/enums";
import { IGuest } from "@/app/models/guest";
import { GuestService } from "@/app/services/guest.service";
import { loadGuestCookie } from "@/lib/server-functions";
import { redirect, RedirectType } from "next/navigation";
import { useEffect, useState } from "react";

export const useGuestWelcomeHook = () => {
  const [currentGuest, setCurrentGuest] = useState<IGuest>();
  const [state, setState] = useState({ isLoading: true, response: AttendanceResponse.unanswered, hasError: false, errorMessage: "" });
  const getUserData = async () => {
    // setState((x) => (x = { ...x, isLoading: true }));
    const res = await loadGuestCookie();
    if (res) {
      const guest = await GuestService.getGuest(res.id);
      if (!guest.hasError()) {
        setState((x) => (x = { ...x, hasError: false, errorMessage: "", isLoading: false, response: guest.data!.response }));
        setCurrentGuest((x) => (x = guest.data!));
      } else {
        setState((x) => (x = { ...x, hasError: true, errorMessage: guest.error!.message, isLoading: false }));
      }
    } else {
      setState(
        (x) =>
          (x = { ...x, hasError: true, errorMessage: "Unable to validate your user. Please contact the issuer of your url for a new one", isLoading: false })
      );
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const reserve = () => {
    redirect("/register/reservation", RedirectType.replace);
  };
  const decline = async () => {
    if (currentGuest) {
      setState((x) => (x = { ...x, isLoading: true }));
      const res = await GuestService.declineInvitate(currentGuest);
      if (res.hasError()) {
        setState((x) => (x = { ...x, isLoading: false, hasError: true, errorMessage: res.error!.message }));
      } else {
        setState((x) => (x = { ...x, isLoading: false, hasError: false, errorMessage: "" }));
        setCurrentGuest((x) => (x = res.data!));
      }
    }
  };
  return { reserve, decline, state };
};
