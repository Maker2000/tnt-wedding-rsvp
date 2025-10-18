"use client";

import React, { useEffect } from "react";
import { useRecordsHook } from "./records.hook";
import { ITimeRecord } from "@/app/models/time-record";
import { Button } from "@mui/material";

function formatDisplayDate(iso: Date) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function formatClockTime(iso: Date) {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function computeDurationMinutes(record: ITimeRecord) {
  if (typeof (record as any).durationMinutes === "number") return Math.max(0, Math.round((record as any).durationMinutes));
  if (record.clockOutTime) {
    const start = new Date(record.clockInTime).getTime();
    const end = new Date(record.clockOutTime).getTime();
    return Math.max(0, Math.round((end - start) / 60000));
  }
  return 0;
}

function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function RecordCard({ record, onClick }: { record: ITimeRecord; onClick: (record: string) => Promise<void> }) {
  const mins = computeDurationMinutes(record);
  const dateLabel = formatDisplayDate(record.clockInTime);
  const timeLabel = record.clockOutTime
    ? `${formatClockTime(record.clockInTime)} — ${formatClockTime(record.clockOutTime)}`
    : `${formatClockTime(record.clockInTime)}`;
  const hook = useRecordsHook();
  return (
    <article className="flex gap-3 items-center p-3 rounded-lg bg-background shadow-sm">
      <div aria-hidden className="w-16 h-16 rounded-md bg-pink-500  flex items-center justify-center font-bold text-xs text-center p-2">
        <div className="leading-tight">{dateLabel}</div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <div className="text-base font-semibold truncate">{formatDuration(mins)}</div>
          <div className="text-sm text-slate-500 ml-3 whitespace-nowrap">{timeLabel}</div>
        </div>
      </div>
      <div>
        <button onClick={() => onClick(record.id)}>{record.paid ? "Paid" : "Not Paid"}</button>
      </div>
    </article>
  );
}

export default function Records() {
  const hook = useRecordsHook();
  const recordsRaw = hook.state.records ?? [];
  const loading = hook.state.isLoading;
  useEffect(() => {
    hook.fetchRecords();
  }, []);
  if (loading) return <div className="p-4">Loading…</div>;
  if (!recordsRaw.length) return <div className="p-4 text-gray-400">No records yet</div>;

  return (
    <div className="p-3">
      <div className="grid gap-3 grid-cols-1">
        {recordsRaw.map((r: ITimeRecord, i: number) => {
          return <RecordCard key={r.id ?? i} record={r} onClick={hook.setRecordPaid} />;
        })}
      </div>
    </div>
  );
}
