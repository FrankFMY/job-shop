import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getOrderById } from "@/mocks/orders/repository";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const order = getOrderById(id);

  if (!order) {
    return NextResponse.json(
      { error: `Order with id "${id}" not found.` },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: order });
}


