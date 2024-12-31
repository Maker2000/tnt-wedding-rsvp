"use client";
import Header from "@/app/components/Header";
import { HttpClient } from "@/lib/http-client";
import { loadAdminCookie, loadGuestCookie } from "@/lib/server-functions";
import React, { useEffect } from "react";
import { useDashboardHook } from "./dashboard.hook";
import { CircularProgress } from "@mui/material";

function Dashboard() {
  const hook = useDashboardHook();
  useEffect(() => {
    hook.getReport();
  }, []);
  return (
    <Header title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 w-full">
        <InfoCard className="lg:col-span-2">
          <div>Guests:</div>
          <div>{hook.state.isLoading ? <CircularProgress size={40} /> : hook.state.reportData.totalGuests}</div>
        </InfoCard>
        <InfoCard>
          <div>Guests RSVP:</div>
          <div>{hook.state.isLoading ? <CircularProgress size={40} /> : hook.state.reportData.reservedGuests}</div>
        </InfoCard>
        <InfoCard>
          <div>Guests Declined:</div>
          <div>{hook.state.isLoading ? <CircularProgress size={40} /> : hook.state.reportData.declinedGuests}</div>
        </InfoCard>
      </div>
    </Header>
  );
}
const InfoCard = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element => {
  let newprops = { ...props, className: `${props.className ?? ""} flex flex-col bg-background p-8 rounded-xl`.trim() };
  return <div {...newprops}></div>;
};
export default Dashboard;
