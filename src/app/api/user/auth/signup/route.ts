import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashed,
    });

    const savedUser = await newUser.save();
    const userId = savedUser._id;

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: userId,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        user: savedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error in signup route",
        error: error,
      },
      { status: 500 }
    );
  }
}
