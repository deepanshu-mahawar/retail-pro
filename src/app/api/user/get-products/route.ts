import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModal";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const products = await Product.find();
    return NextResponse.json(
      {
        message: "Products fetched successfully",
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch products",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
