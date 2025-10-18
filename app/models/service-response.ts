export class ServiceResponse<T> {
  data?: T;
  error?: Error;
  responseStatus: ServiceResponseStatus;
  hasError(): boolean {
    return this.responseStatus === ServiceResponseStatus.Error;
  }
  constructor(responseStatus: ServiceResponseStatus, data?: T, error?: Error) {
    this.data = data;
    this.error = error;
    this.responseStatus = responseStatus;
  }
  static success<T>(data: T) {
    return new ServiceResponse<T>(ServiceResponseStatus.Success, data);
  }
  static failed<T>(error: Error) {
    return new ServiceResponse<T>(ServiceResponseStatus.Error, undefined, error);
  }
}

export enum ServiceResponseStatus {
  Success = "Success",
  NotFound = "NotFound",
  Error = "Error",
}
