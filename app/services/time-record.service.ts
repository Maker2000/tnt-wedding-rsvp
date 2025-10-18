import { HttpClient } from "@/lib/http-client";
import { CreateTimeRecordDto, ITimeRecord } from "../models/time-record";
import { ServiceResponse } from "../models/service-response";

export class TimeRecordService {
  static timeRecordEndpoint: string = `/api/time-record`;

  static async getAllTimeRecords(): Promise<ServiceResponse<ITimeRecord[]>> {
    return await HttpClient.getData<ITimeRecord[]>(this.timeRecordEndpoint);
  }

  static async createTimeRecord(dto: CreateTimeRecordDto): Promise<ServiceResponse<ITimeRecord>> {
    // ensure dates are sent as UTC ISO strings
    return await HttpClient.postData<ITimeRecord, CreateTimeRecordDto>(`${this.timeRecordEndpoint}`, dto);
  }

  static async availableTimeRecord(): Promise<ServiceResponse<ITimeRecord>> {
    return await HttpClient.getData<ITimeRecord>(`${this.timeRecordEndpoint}/record`);
  }
  static async closeTimeRecord(record: ITimeRecord): Promise<ServiceResponse<ITimeRecord>> {
    return await HttpClient.putData<ITimeRecord, ITimeRecord>(`${this.timeRecordEndpoint}/record`, record);
  }
  static async updateTimeRecord(record: ITimeRecord): Promise<ServiceResponse<ITimeRecord>> {
    return await HttpClient.putData<ITimeRecord, ITimeRecord>(`${this.timeRecordEndpoint}/${record.id}`, record);
  }
}
