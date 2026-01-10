import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("Request Body:", reqBody); 
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User does not exist",
        },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          message: " Invalid password",
        },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.AUTH_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "User signed in successfully",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error is signin route",
        error: error,
      },
      { status: 500 }
    );
  }
}
