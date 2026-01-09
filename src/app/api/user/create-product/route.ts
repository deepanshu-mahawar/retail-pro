import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModal";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      productName,
      productPrice,
      productStock,
      productCategory,
      productDescription,
    } = reqBody;

    console.log("Request Body:", reqBody);

    const newProduct = new Product({
      productName,
      productPrice,
      productStock,
      productCategory,
      productDescription,
    });

    const savedProduct = await newProduct.save();
    return NextResponse.json(
      {
        message: "Product created successfully",
        success: true,
        product: savedProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        message: "Failed to create product",
      },
      { status: 500 }
    );
  }
}
