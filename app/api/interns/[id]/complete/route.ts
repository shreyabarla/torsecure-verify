import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { interns } from "@/db/schema";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const intern = await db.query.interns.findFirst({
      where: eq(interns.id, Number(id)),
    });

    if (!intern) {
      return NextResponse.json(
        {
          success: false,
          message: "Intern not found",
        },
        { status: 404 }
      );
    }

    await db
      .update(interns)
      .set({
        status: "Completed",
      })
      .where(eq(interns.id, Number(id)));

    return NextResponse.json({
      success: true,
      message: "Intern marked as completed",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}