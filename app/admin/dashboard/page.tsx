"use client";
import Header from "@/components/Header";
import React, { useEffect } from "react";
import { useDashboardHook } from "./dashboard.hook";
import { CircularProgress } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import Countdown from "@/components/Countdown";
import { weddingDate } from "@/lib/constants";

function Dashboard() {
  const hook = useDashboardHook();
  useEffect(() => {
    hook.getReport();
  }, []);

  // Prepare pie chart data
  const reserved = hook.state.reportData.reservedGuests + hook.state.reportData.reservedPlusOne;
  const declined = hook.state.reportData.declinedGuests + hook.state.reportData.declinedPlusOne;
  const total = hook.state.reportData.totalGuests + hook.state.reportData.totalPlusOne;
  const notResponded = Math.max(total - reserved - declined, 0);
  const pieData = [
    { name: "RSVP'd", value: reserved },
    { name: "Declined", value: declined },
    { name: "Not Responded", value: notResponded },
  ];
  const COLORS = ["#ecb5bcff", "#ff0000", "#40E0D0"];

  return (
    <Header title="Dashboard">
      <div className="py-8 bg-background rounded-xl m-4">
        <div className="scale-[80%] sm:scale-100">
          <Countdown targetDate={weddingDate} title="Until Our Wedding Day" />
        </div>
      </div>
      <div className="w-full flex justify-center items-center p-4">
        <div className="w-full h-[30rem] bg-background p-8 rounded-xl">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 w-full">
        <InfoCard className="lg:col-span-2">
          <div>Guests:</div>
          <div>{hook.state.isLoading ? <CircularProgress size={20} thickness={2} /> : total}</div>
        </InfoCard>
        <InfoCard>
          <div>Guests RSVP:</div>
          <div>{hook.state.isLoading ? <CircularProgress size={20} thickness={2} /> : reserved}</div>
        </InfoCard>
        <InfoCard>
          <div>Guests Declined:</div>
          <div>{hook.state.isLoading ? <CircularProgress size={20} thickness={2} /> : declined}</div>
        </InfoCard>
      </div>
      {/* Pie Chart Section */}
    </Header>
  );
}
const InfoCard = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element => {
  const newprops = { ...props, className: `${props.className ?? ""} flex flex-col bg-background p-8 rounded-xl`.trim() };
  return <div {...newprops}></div>;
};
export default Dashboard;
