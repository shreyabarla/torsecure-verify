import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { interns, certificates } from "@/db/schema";
import { generateCertificateId } from "@/lib/generateCertificateId";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { internId } = body;

    // Check if intern exists
    const intern = await db.query.interns.findFirst({
      where: eq(interns.id, internId),
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

    // Check if certificate already exists
    const existingCertificate = await db.query.certificates.findFirst({
      where: eq(certificates.internId, intern.id),
    });

    if (existingCertificate) {
      return NextResponse.json(
        {
          success: false,
          message: "Certificate has already been generated for this intern.",
        },
        { status: 400 }
      );
    }

    // Check internship status
    if (intern.status !== "Completed") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Certificate can only be generated after internship completion.",
        },
        { status: 400 }
      );
    }

    // Generate Certificate ID
    const certificateId = await generateCertificateId();

    // Save certificate
    const certificate = await db
      .insert(certificates)
      .values({
        certificateId,
        internId: intern.id,
      })
      .returning();

    // Update intern status
    await db
      .update(interns)
      .set({
        status: "Certified",
      })
      .where(eq(interns.id, intern.id));

    return NextResponse.json({
      success: true,
      message: "Certificate generated successfully",
      data: certificate[0],
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