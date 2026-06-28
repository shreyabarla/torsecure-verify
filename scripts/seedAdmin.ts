import "dotenv/config";

import { db } from "../db";
import { admins } from "../db/schema";
import { hashPassword } from "../lib/password";

async function seedAdmin() {
  try {
    const hashedPassword = await hashPassword("Admin@123");

    await db.insert(admins).values({
      email: process.env.ADMIN_EMAIL!,
      password: await hashPassword(process.env.ADMIN_PASSWORD!),  
    });

    console.log("✅ Admin created successfully!");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }

  process.exit(0);
}

seedAdmin();