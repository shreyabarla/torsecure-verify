import { db } from "@/db";
import { interns } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function generateTorsecureId() {
  // Get the most recently added intern
  const lastIntern = await db.query.interns.findFirst({
    orderBy: [desc(interns.id)],
  });

  // Default for the first intern
  let nextNumber = 1;

  if (lastIntern) {
    const lastNumber = parseInt(
      lastIntern.torsecureId.replace("TS", "")
    );

    nextNumber = lastNumber + 1;
  }

  const torsecureId = `TS${nextNumber
    .toString()
    .padStart(6, "0")}`;

  return torsecureId;
}