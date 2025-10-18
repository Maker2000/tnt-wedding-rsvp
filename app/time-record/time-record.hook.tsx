import { ServiceResponseStatus } from "../models/service-response";
import { TimeRecordService } from "../services/time-record.service";

const useTimeRecordHook = () => {
  const getAllTimeRecords = async () => {
    var res = await TimeRecordService.getAllTimeRecords();
    if (res.responseStatus === ServiceResponseStatus.Success) {
      return res.data;
    }
    return [];
  };
  return {};
};

export default useTimeRecordHook;
