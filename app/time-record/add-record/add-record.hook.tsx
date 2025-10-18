"use client";
import { ServiceResponseStatus } from "@/app/models/service-response";
import { CreateTimeRecordDto, ITimeRecord } from "@/app/models/time-record";
import { TimeRecordService } from "@/app/services/time-record.service";
import { useEffect, useState } from "react";

export const useAddTimeRecordHook = () => {
  const getCurrentTimeRecord = async () => {
    setState((x) => (x = { ...x, isLoading: true }));
    var res = await TimeRecordService.availableTimeRecord();
    if (res.responseStatus === ServiceResponseStatus.NotFound) {
      setState((x) => (x = { ...x, timeRecord: null, isLoading: false }));
      return;
    }
    setState((x) => (x = { ...x, timeRecord: res.data!, isLoading: false }));
    return;
  };
  const [state, setState] = useState<{
    isLoading: boolean;
    errorMessage: string;
    timeRecord?: ITimeRecord | null;
  }>({
    isLoading: true,
    errorMessage: "",
    timeRecord: null,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((x) => (x = { ...x, isLoading: true }));
    try {
      // If there's no open record, create one (clock in)
      if (!state.timeRecord) {
        // pass a Date object; service will serialize to UTC ISO
        const dto: CreateTimeRecordDto = { clockInTime: new Date() };
        const res = await TimeRecordService.createTimeRecord(dto);
        if (res.responseStatus === ServiceResponseStatus.Success) {
          setState((x) => (x = { ...x, timeRecord: res.data! }));
        }
        return;
      }
      // If open record exists but no clockOutTime, close it
      if (state.timeRecord && !state.timeRecord.clockOutTime) {
        // build ITimeRecord payload and set clockOutTime to now (Date)
        const payload: ITimeRecord = {
          ...state.timeRecord,
          clockOutTime: new Date(),
        } as ITimeRecord;
        const res = await TimeRecordService.closeTimeRecord(payload);
        if (res.responseStatus === ServiceResponseStatus.Success) {
          setState((x) => (x = { ...x, timeRecord: null }));
        }
        return;
      }
    } finally {
      setState((x) => (x = { ...x, isLoading: false }));
    }
  };
  return { state, handleSubmit, getCurrentTimeRecord };
};
