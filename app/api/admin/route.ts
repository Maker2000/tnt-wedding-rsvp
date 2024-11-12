import { Role } from "@/app/models/enums";
import { CreateUserDto } from "@/app/models/user";
import { User } from "@/app/models/user.mongoose";
import connectDB from "@/lib/mongose-client";
import { genSalt, hash } from "bcrypt";

export async function GET(): Promise<Response> {
  try {
    await connectDB();
    let res = await User.find();
    return Response.json({ message: "hello", data: res });
  } catch (error) {
    return Response.json({ message: "hello", error: error }, { status: 500 });
  }
}
