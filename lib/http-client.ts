import { ApiResponseData } from "@/app/api/exception-filter";
import { ServiceResponse } from "@/app/models/service-response";

export class HttpClient {
  private static async tryRequest<Res>(op: () => Promise<ServiceResponse<Res>>): Promise<ServiceResponse<Res>> {
    try {
      return await op();
    } catch {
      return ServiceResponse.failed(new Error("Unknown error occured"));
    }
  }
  static async postData<Res, Req>(path: string, body: Req, getResponseHeader?: (headers: Headers) => Promise<void>): Promise<ServiceResponse<Res>> {
    return this.tryRequest(async () => {
      const res = await fetch(path, { method: "POST", body: JSON.stringify(body) });
      return await this.processResponse<Res>(res, getResponseHeader);
    });
  }
  static async getData<Res>(path: string): Promise<ServiceResponse<Res>> {
    return this.tryRequest(async () => {
      const res = await fetch(path, { method: "GET" });
      return await this.processResponse<Res>(res);
    });
  }
  static async deleteData<Res>(path: string): Promise<ServiceResponse<Res>> {
    return this.tryRequest(async () => {
      const res = await fetch(path, { method: "DELETE" });
      return await this.processResponse<Res>(res);
    });
  }
  static async putData<Res, Req>(path: string, body: Req, getResponseHeader?: (headers: Headers) => Promise<void>): Promise<ServiceResponse<Res>> {
    return this.tryRequest(async () => {
      const res = await fetch(path, { method: "PUT", body: JSON.stringify(body) });
      return await this.processResponse<Res>(res, getResponseHeader);
    });
  }
  private static async processResponse<Res>(res: Response, getResponseHeader?: (headers: Headers) => Promise<void>): Promise<ServiceResponse<Res>> {
    switch (res.status) {
      case 200:
        if (getResponseHeader) {
          await getResponseHeader(res.headers);
        }
        return ServiceResponse.success((await res.json()) as Res);
      case 400:
        return ServiceResponse.failed(new Error(((await res.json()) as ApiResponseData).message));
      case 401:
        return ServiceResponse.failed(new Error(((await res.json()) as ApiResponseData).message));
      default:
        return ServiceResponse.failed(new Error("Server error occured"));
    }
  }
}
