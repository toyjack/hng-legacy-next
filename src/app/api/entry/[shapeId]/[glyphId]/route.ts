import { getEntryById } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET( { params }: { params: Promise<{ shapeId: string, glyphId: string }> }) {
  const { shapeId, glyphId } = await params;

  // Fetch the entry from the database
  const entry = await getEntryById(shapeId);

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  // Return the entry as a JSON response
  return NextResponse.json(entry);
}