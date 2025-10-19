import { ServiceResponseStatus } from "@/app/models/service-response";
import { ITimeRecord } from "@/app/models/time-record";
import { TimeRecordService } from "@/app/services/time-record.service";
import { useState } from "react";

export const useRecordsHook = () => {
  const [state, setState] = useState<{
    isLoading: boolean;
    errorMessage: string;
    records: ITimeRecord[];
    unpaidHours: number;
  }>({
    isLoading: true,
    errorMessage: "",
    records: [],
    unpaidHours: 0,
  });

  const fetchRecords = async () => {
    setState((x) => (x = { ...x, isLoading: true }));
    const res = await TimeRecordService.getAllTimeRecords();
    if (res.responseStatus === ServiceResponseStatus.Success) {
      setState((x) => (x = { ...x, records: res.data!, errorMessage: "" }));
    } else {
      setState((x) => (x = { ...x, errorMessage: res.error?.message || "An error occurred" }));
    }
    const unpaidRes = await TimeRecordService.getUnpaidHours();
    if (unpaidRes.responseStatus === ServiceResponseStatus.Success) {
      setState((x) => (x = { ...x, unpaidHours: unpaidRes.data?.totalHours || 0 }));
    }
    setState((x) => (x = { ...x, isLoading: false }));
  };

  const setRecordPaid = async (id: string) => {
    const recordIndex = state.records.findIndex((r) => r.id == id);
    if (recordIndex < 0) return;
    const record = state.records[recordIndex];
    const updatedRecord = { ...record, paid: !record.paid };
    const updatedRecordsOptimistic = [...state.records];
    updatedRecordsOptimistic[recordIndex] = updatedRecord;
    setState((x) => (x = { ...x, records: updatedRecordsOptimistic }));

    const res = await TimeRecordService.updateTimeRecord(updatedRecord);
    if (res.responseStatus !== ServiceResponseStatus.Success) {
      setState((x) => (x = { ...x, records: state.records }));
      return;
    }
    const updatedRecords = [...state.records];
    updatedRecords[recordIndex] = res.data!;
    setState((x) => (x = { ...x, records: updatedRecords }));
    const unpaidRes = await TimeRecordService.getUnpaidHours();
    if (unpaidRes.responseStatus === ServiceResponseStatus.Success) {
      setState((x) => (x = { ...x, unpaidHours: unpaidRes.data?.totalHours || 0 }));
    }
  };
  return { state, fetchRecords, setRecordPaid };
};
