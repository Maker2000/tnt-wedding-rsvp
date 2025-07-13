import { HttpClient } from "@/lib/http-client";
import { ServiceResponse } from "../models/service-response";
import { IGuest } from "../models/guest";
import { ApiResponseData } from "../api/exception-filter";
import { AttendanceResponse } from "../models/enums";

export class GuestService {
  static guestEndpoint(id: string): string {
    return `/api/guest/${id}`;
  }
  static async reserveInvite(dto: IGuest): Promise<ServiceResponse<IGuest>> {
    return await HttpClient.putData<IGuest, IGuest>(this.guestEndpoint(dto.id), { ...dto!, response: AttendanceResponse.attending });
  }
  static async declineInvite(dto: IGuest): Promise<ServiceResponse<IGuest>> {
    return await HttpClient.putData<IGuest, IGuest>(this.guestEndpoint(dto.id), { ...dto!, response: AttendanceResponse.declined });
  }
  static async deleteGuest(id: string): Promise<ServiceResponse<ApiResponseData>> {
    return await HttpClient.deleteData<ApiResponseData>(this.guestEndpoint(id));
  }
  static async getGuest(id: string): Promise<ServiceResponse<IGuest>> {
    return await HttpClient.getData<IGuest>(this.guestEndpoint(id));
  }
}
