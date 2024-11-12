import { ClientException, NotFoundException, ServerException } from "@/app/api/exception-filter";

export class Contract {
  static requires = (condition: boolean, message: string) => {
    if (!condition) throw new ServerException(message);
  };
  static requireNotNull = <T>(data: T, message: string): data is T => {
    if (!data) throw new ServerException(message);
    return data != null;
  };
  static requireNull = <T>(data: T, message: string) => {
    if (data) throw new ServerException(message);
  };
}
export class Validation {
  static requires = (condition: boolean, message: string) => {
    if (!condition) throw new ClientException(message);
  };
  static requireNotNull = <T>(data: T, message: string) => {
    if (!data) throw new ClientException(message);
  };
  static requireNull = <T>(data: T, message: string) => {
    if (data) throw new ClientException(message);
  };
  static requireEntityFound = <T>(data: T, itemName: string) => {
    if (!data) throw new NotFoundException(itemName);
  };
}
