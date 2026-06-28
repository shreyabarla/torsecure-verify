import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { admins } from "@/db/schema";

import { loginSchema } from "@/lib/validation";
import { verifyPassword } from "@/lib/password";
import { createToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Read request body
    const body = await request.json();

    // Validate request
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Find admin by email
    const admin = await db.query.admins.findFirst({
      where: eq(admins.email, email),
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await verifyPassword(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Create JWT
    const token = await createToken({
      id: admin.id,
      email: admin.email,
    });

    // Response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    // Store JWT in HttpOnly cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
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