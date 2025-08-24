import { getBooks } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const books = await getBooks();
  return NextResponse.json(books);
} 