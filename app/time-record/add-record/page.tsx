"use client";

import React, { useEffect, useState } from "react";
import { useAddTimeRecordHook } from "./add-record.hook";

export default function AddRecord() {
  // value format for input[type=datetime-local] is "YYYY-MM-DDTHH:mm"
  const { state, handleSubmit, getCurrentTimeRecord } = useAddTimeRecordHook();
  useEffect(() => {
    getCurrentTimeRecord();
  }, []);
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{!state.timeRecord ? "Clock In" : state.timeRecord.clockOutTime ? "Time Record" : "Clock Out"}</h1>
      {state.isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* show current clock-in time if present */}
          {state.timeRecord && <div className="text-sm text-gray-700">Clocked in at: {new Date(state.timeRecord.clockInTime).toLocaleString()}</div>}
          <div className="flex gap-2">
            <button type="submit" className="rounded bg-blue-600 text-white px-4 py-2">
              {!state.timeRecord ? "Clock In" : !state.timeRecord.clockOutTime ? "Clock Out" : "Saved"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
