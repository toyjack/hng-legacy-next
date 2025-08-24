import { getAllEntries } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const entries = await getAllEntries();
  return NextResponse.json(entries);
}