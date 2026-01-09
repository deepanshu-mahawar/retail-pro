import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModal";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { productId } = reqBody;

    await Product.findByIdAndDelete(productId);

    return NextResponse.json(
      {
        message: "Product deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        message: "Failed to delete product",
        success: false,
      },
      { status: 500 }
    );
  }
}
