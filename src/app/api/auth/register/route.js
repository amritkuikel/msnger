import { NextResponse } from "next/server";
import User from "@/models/usermodel";
import mongooseConnect from "@/app/utils/dbconnect";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_PASSWORD;

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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password:hash });
    const salt2 = await bcrypt.genSalt(10);
    const hash2 = await bcrypt.hash(toString(user._id), salt2);
    const hashNoSlash = hash2.replaceAll("/", "");
    await User.findOneAndUpdate({ email }, { token: hashNoSlash });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser || 'amritkuikel5689@gmail.com',
        pass: gmailPassword || 'jsfbbvmbzctnrysw',
      },
    });
    async function main() {
      await transporter.sendMail({
        from: "amritkuikel5689@gmail.com",
        to: email,
        subject: "VERIFICATION MAIL",
        text: "plz click the link below to be verified user and use our services.",
        html: `<a href='http://localhost:3000/mailverify?a=${hashNoSlash}'>CLICK ME</a>`,
      });
    }
    await main().catch(console.error);
    return NextResponse.json({
      message: "user registered succesfully plz verify mail",
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "user not registered", status: 400 });
  }
}
