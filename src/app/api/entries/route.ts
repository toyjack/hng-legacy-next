import { getEntries } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const entries = await getEntries();
  return NextResponse.json(entries);
}