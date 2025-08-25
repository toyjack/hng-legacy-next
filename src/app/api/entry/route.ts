import { getEntryById } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get the entry ID from the request
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // Fetch the entry from the database
  const entry = await getEntryById(id);

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  // Return the entry as a JSON response
  return NextResponse.json(entry);
}