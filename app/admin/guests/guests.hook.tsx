import { ReservationType } from "@/app/models/enums";
import { CreateGuestDto, GuestDisplay, IGuest } from "@/app/models/guest";
import { HttpClient } from "@/lib/http-client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { ColDef, GetContextMenuItemsParams, MenuItemDef } from "ag-grid-community";
interface GuestsState {
  guests: IGuest[];
  isLoading: boolean;
  colDefs: ColDef<IGuest>[];
  errorMessage: string;
}
export const useGuestsHook = () => {
  const [state, setState] = useState<GuestsState>({
    guests: [],
    colDefs: [
      {
        valueGetter: (params) => {
          return `${params.data?.firstName} ${params.data?.lastName}`;
        },
        headerName: "Name",
      },
      {
        valueGetter: (params) => {
          return `${params.data?.plusOne?.firstName ?? "-"} ${params.data?.plusOne?.lastName ?? ""}`;
        },
        headerName: "Plus 1",
      },
      {
        field: "reserved",
      },
    ],
    isLoading: true,
    errorMessage: "",
  });
  const deleteGuest = (id: string) => {};
  // const getContextMenuItems = useCallback(
  //   (params: GetContextMenuItemsParams) => {
  //     var result: (string | MenuItemDef)[] = [
  //       {
  //         name: "Delete",
  //         action: () => {},
  //         cssClasses: ["red", "bold"],
  //       },
  //     ];
  //     return result;
  //   },
  //   [window]
  // );
  const fetchGuests = async () => {
    setState((x) => (x = { ...x, isLoading: true }));
    let res = await HttpClient.getData<Array<GuestDisplay>>("/api/guest");
    if (res.hasError()) {
      setState((x) => (x = { ...x, isLoading: false, errorMessage: res.error!.message, guests: [] }));
      return;
    }
    setState((x) => (x = { ...x, isLoading: false, errorMessage: "", guests: res.data! }));
  };

  return {
    deleteGuest,
    state,
    fetchGuests,
    // getContextMenuItems,
  };
};
