import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import db from "@repo/db/client";
export async function POST(req: Request) {
  try {
    const { name, phone, password } = await req.json();
    if (!name || !phone || !password) {
      return NextResponse.json(
        { message: "Missing Attributes in body" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        name,
        number: phone,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "user has been added successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.log("Sign up Error ", e);
    return NextResponse.json({ message: "An error occured during signing up" });
  }
}
