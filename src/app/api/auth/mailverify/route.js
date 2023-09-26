import { NextResponse } from "next/server";
import User from "@/models/usermodel";
import mongooseConnect from "@/app/utils/dbconnect";

export async function POST(request) {
  mongooseConnect();
  const { value } = await request.json();
  const user = await User.findOne({ token: value });
  if (!user) {
    return NextResponse.json({
      message: "authentication fail invalid token",
    });
  } else {
    if (value != user.token) {
      return NextResponse.json({
        message: "token not matching",
      });
    }
    await User.findOneAndUpdate({ token: value }, { isVerified: true });
    return NextResponse.json({
      message: "successfully verified",
    });
  }
}
