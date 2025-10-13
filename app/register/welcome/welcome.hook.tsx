import { AttendanceResponse } from "@/app/models/enums";
import { IGuest } from "@/app/models/guest";
import { GuestService } from "@/app/services/guest.service";
import { loadGuestCookie } from "@/lib/server-functions";
import { redirect, RedirectType } from "next/navigation";
import { useEffect, useState } from "react";
interface EventInformation {
  title: string;
  time: string;
  additionalInformation?: string;
}
export const useGuestWelcomeHook = () => {
  const eventInfo: EventInformation[] = [
    {
      title: "Ceremony",
      time: "2:00PM - 3:00PM",
      additionalInformation: "Join us as we exchange vows and begin our journey as husband and wife.",
    },
    {
      title: "Cocktail Hour",
      time: "3:00PM - 4:00PM",
      additionalInformation: "Sip, mingle, and enjoy while the bridal party captures special moments",
    },
    {
      title: "Reception",
      time: "4:00PM - 9:00PM",
      additionalInformation: "Let the celebration begin! Enjoy dinner, dancing, and heartfelt memories.",
    },
  ];
  const address = "Ingleside, 12A Kendal Road, Mandeville, Jamaica";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const [currentGuest, setCurrentGuest] = useState<IGuest>();
  const [state, setState] = useState({ isLoading: true, hasError: false, errorMessage: "", loadingMessage: "" });
  const getUserData = async () => {
    // setState((x) => (x = { ...x, isLoading: true }));
    const res = await loadGuestCookie();
    if (res) {
      const guest = await GuestService.getGuest(res.id);
      if (!guest.hasError()) {
        setState((x) => (x = { ...x, hasError: false, errorMessage: "", isLoading: false }));
        setCurrentGuest((x) => (x = guest.data!));
      } else {
        redirect("/", RedirectType.replace);
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
  const cutoffDate = new Date("2025-10-17T23:59:00Z");
  const isCutoffDatePassed = () => new Date() > cutoffDate;
  const decline = async () => {
    if (currentGuest) {
      setState((x) => (x = { ...x, isLoading: true, loadingMessage: "Declining..." }));
      const res = await GuestService.declineInvite(currentGuest);
      if (res.hasError()) {
        setState((x) => (x = { ...x, isLoading: false, hasError: true, errorMessage: res.error!.message, loadingMessage: "" }));
      } else {
        setState((x) => (x = { ...x, isLoading: false, hasError: false, errorMessage: "", loadingMessage: "" }));
        console.log("Declined successfully", res.data);
        setCurrentGuest((x) => (x = res.data!));
      }
    }
  };
  return { reserve, decline, state, address, eventInfo, mapsUrl, currentGuest, cutoffDate, isCutoffDatePassed, setCurrentGuest };
};
