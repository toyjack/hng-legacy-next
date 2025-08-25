import { getEntryById } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ shapeId: string }> }) {
  const { shapeId } = await params;

  // Fetch the entry from the database
  const entry = await getEntryById(shapeId);

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  // Return the entry as a JSON response
  return NextResponse.json(entry);
}