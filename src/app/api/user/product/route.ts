import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Product from "@/models/productModal";

connect();

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const user = jwt.verify(token, process.env.AUTH_SECRET!) as { id: string };

    const reqBody = await request.json();
    const product = await Product.create({ ...reqBody, userId: user?.id });

    return NextResponse.json(
      {
        message: "Product created successfully",
        success: true,
        product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating product",
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const user = jwt.verify(token, process.env.AUTH_SECRET!) as { id: string };

    const products = await Product.find({ userId: user?.id });
    return NextResponse.json(
      {
        message: "Products fetched successfully",
        success: true,
        data: products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching products",
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}
