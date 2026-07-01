import { db } from "@/db";
import { certificates } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function generateCertificateId() {
  const lastCertificate = await db.query.certificates.findFirst({
    orderBy: [desc(certificates.id)],
  });

  let nextNumber = 1;

  if (lastCertificate) {
    nextNumber =
      Number(lastCertificate.certificateId.replace("CERT", "")) + 1;
  }

  return `CERT${String(nextNumber).padStart(4, "0")}`;
}