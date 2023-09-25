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
    });
    const user = await User.create({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(toString(user._id), salt);
    const hash2 = hash.replaceAll("/", "");
    await User.findOneAndUpdate({ email }, { token: hash2 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amritkuikel5689@gmail.com",
        pass: "jsfbbvmbzctnrysw",
      },
    });
    async function main() {
      await transporter.sendMail({
        from: "amritkuikel5689@gmail.com",
        to: email,
        subject: "VERIFICATION MAIL",
        text: "plz click the link below to be verified user and use our services.",
        html: `<a href='http://localhost:3000/mailverify?a=${hash2}'>CLICK ME</a>`,
      });
    }
    main().catch(console.error);
    return NextResponse.json({
      message: "user registered succesfully plz verify mail",
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "user not registered", status: 400 });
  }
}
