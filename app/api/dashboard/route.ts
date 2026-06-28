import { NextResponse } from "next/server";
import { db } from "@/db";
import { interns } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Get all interns
    const allInterns = await db.query.interns.findMany();

    // Count active interns
    const activeInterns = await db.query.interns.findMany({
      where: eq(interns.status, "Active"),
    });

    // Count completed interns
    const completedInterns = await db.query.interns.findMany({
      where: eq(interns.status, "Completed"),
    });


    return NextResponse.json({
      success: true,
      data: {
        totalInterns: allInterns.length,
        activeInterns: activeInterns.length,
        completedInterns: completedInterns.length,

        recentInterns: allInterns.slice(-5).reverse(),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}