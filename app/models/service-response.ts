export class ServiceResponse<T> {
  data?: T;
  error?: Error;
  hasError(): boolean {
    return this.data == null || this.data == undefined;
  }
  constructor(data?: T, error?: Error) {
    this.data = data;
    this.error = error;
  }
  static success<T>(data: T) {
    return new ServiceResponse<T>(data);
  }
  static failed<T>(error: Error) {
    return new ServiceResponse<T>(undefined, error);
  }
}
