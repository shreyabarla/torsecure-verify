import { NextResponse } from "next/server";
import { db } from "@/db";
import { interns } from "@/db/schema";
import { generateTorsecureId } from "@/lib/generateTorsecureId";
import { internSchema } from "@/lib/validations/intern";
import { desc, asc } from "drizzle-orm";
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate first
    const result = internSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const validatedData = result.data;

    const torsecureId = await generateTorsecureId();

    await db.insert(interns).values({
      torsecureId,
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      college: validatedData.college,
      designation: validatedData.designation,
      startDate: new Date(validatedData.startDate),
      endDate: new Date(validatedData.endDate),
    });

    return NextResponse.json({
      success: true,
      message: "Intern registered successfully",
      torsecureId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allInterns = await db.query.interns.findMany({
      orderBy: [asc(interns.id)],
    });

    return NextResponse.json({
      success: true,
      data: allInterns,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch interns",
      },
      {
        status: 500,
      }
    );
  }
}