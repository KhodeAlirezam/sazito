import { NextResponse } from "next/server";

import { getProducts } from "@/lib/helpers/database";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page");
  const pageSize = searchParams.get("page_size");
  const filters = searchParams.getAll("filters[]");
  const sortings = searchParams.getAll("sortings[]");

  const data = await getProducts({ page, pageSize, sortings, filters });

  return NextResponse.json(data);
}
