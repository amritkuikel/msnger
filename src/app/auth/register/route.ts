import { NextResponse } from "next/server";
import User from "@/models/usermodel";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    await User.create({ name, email, password });
    return NextResponse.json({message:'user registered succesfully ',status:200})
  } catch (e) {
    console.log(e)
    return NextResponse.json({message:'user not registered',status:400})
  }
}
