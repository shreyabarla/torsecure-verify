import { NextResponse } from "next/server";
import { db } from "@/db";
import { interns } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
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

    return NextResponse.json({
      success: true,
      data: intern,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    await db
      .update(interns)
      .set({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        college: body.college,
        designation: body.designation,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
      })
      .where(eq(interns.id, Number(id)));

    return NextResponse.json({
      success: true,
      message: "Intern updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db
      .delete(interns)
      .where(eq(interns.id, Number(id)));

    return NextResponse.json({
      success: true,
      message: "Intern deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}