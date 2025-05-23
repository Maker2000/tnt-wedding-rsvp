"use client";
import Header from "@/app/components/Header";
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
          <div>
            {hook.state.isLoading ? <CircularProgress size={20} thickness={2} /> : hook.state.reportData.totalGuests + hook.state.reportData.totalPlusOne}
          </div>
        </InfoCard>
        <InfoCard>
          <div>Guests RSVP:</div>
          <div>
            {hook.state.isLoading ? <CircularProgress size={20} thickness={2} /> : hook.state.reportData.reservedGuests + hook.state.reportData.reservedPlusOne}
          </div>
        </InfoCard>
        <InfoCard>
          <div>Guests Declined:</div>
          <div>
            {hook.state.isLoading ? <CircularProgress size={20} thickness={2} /> : hook.state.reportData.declinedGuests + hook.state.reportData.declinedPlusOne}
          </div>
        </InfoCard>
      </div>
    </Header>
  );
}
const InfoCard = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element => {
  const newprops = { ...props, className: `${props.className ?? ""} flex flex-col bg-background p-8 rounded-xl`.trim() };
  return <div {...newprops}></div>;
};
export default Dashboard;
