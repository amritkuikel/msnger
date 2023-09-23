import { NextResponse } from "next/server";
import User from "@/models/usermodel";
import mongooseConnect from "@/app/utils/dbconnect";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    await mongooseConnect();
    let { name, email, password } = await request.json();
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return NextResponse.json({
        message: "email exists please login ",
        status: 200,
      });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      password = hash;
      await User.create({ name, email, password });
    });

    return NextResponse.json({
      message: "user registered succesfully ",
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "user not registered", status: 400 });
  }
}
