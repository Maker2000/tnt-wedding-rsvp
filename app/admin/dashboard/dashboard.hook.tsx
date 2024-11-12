import { DashboardReport } from "@/app/models/reports";
import { HttpClient } from "@/lib/http-client";
import { useState } from "react";

export const useDashboardHook = () => {
  const [state, setState] = useState({ isLoading: true, reportData: { totalGuests: 0, reservedGuests: 0 } as DashboardReport });
  const getReport = async () => {
    setState((x) => (x = { ...x, isLoading: true }));
    let res = await HttpClient.getData<DashboardReport>("/api/admin/report");
    if (res.hasError()) {
      setState((x) => (x = { ...x, isLoading: false }));
      return;
    }
    setState((x) => (x = { ...x, isLoading: false, reportData: res.data! }));
  };
  return {
    state,
    getReport,
  };
};
