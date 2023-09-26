import { NextResponse } from "next/server";
import User from "@/models/usermodel";
import mongooseConnect from "@/app/utils/dbconnect";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {cookies} from 'next/headers'

export async function POST(request) {
  mongooseConnect();
  const { email, password } = await request.json();
  const user = await User.findOne({ email });
  if (user) {
    const verified = user.isVerified;
    if(verified){
      const pwdMatch =  await bcrypt.compare(password, user.password);
      if (!pwdMatch) {
        return NextResponse.json({
          message: "wrong password for provided email",
        });
      }
      var jwtToken = await jwt.sign(
        { name: user.name, email: email },
        "jwt private key",
        { expiresIn: "30d" }

      );
      cookies().set({
        name:'token',
        value:jwtToken
      })
      return NextResponse.json({ message: "login successful"});
    }
    return NextResponse.json({ message: "plz verify mail to login" });
  }
  return NextResponse.json({ message: "email not found please login" });
}
