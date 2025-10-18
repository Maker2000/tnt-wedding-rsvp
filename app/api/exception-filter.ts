import { NextResponse } from "next/server";

export const tryOperation = async (op: () => Promise<NextResponse>): Promise<NextResponse> => {
  try {
    return await op();
  } catch (error) {
    if (error instanceof GeneralException) {
      return error.response();
    }
    return NextResponse.json(new ApiResponseData("Unknown error occured"), { status: 500 });
  }
};
class GeneralException {
  message: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
  response: () => NextResponse = () => {
    return NextResponse.json(new ApiResponseData(this.message), { status: this.statusCode });
  };
}
export class ClientException extends GeneralException {
  constructor(message: string) {
    super(message, 400);
  }
}
export class NotFoundException extends GeneralException {
  constructor(itemName: string) {
    super(`${itemName} was not found`, 404);
  }
}
export class UnauthorizedException extends GeneralException {
  constructor(message?: string) {
    super(message ?? "You are unauthorized.", 401);
  }
}
export class ServerException extends GeneralException {
  constructor(message: string) {
    super(message, 500);
  }
}

export class ApiResponseData {
  message: string;
  detail?: string;
  constructor(message: string, detail?: string) {
    this.message = message;
    this.detail = detail;
  }
}
