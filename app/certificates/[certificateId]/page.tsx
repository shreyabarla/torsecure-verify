import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { certificates, interns } from "@/db/schema";
import QRCode from "qrcode";
export default async function CertificatePage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = await params;

  // Find certificate
  const certificate = await db.query.certificates.findFirst({
    where: eq(certificates.certificateId, certificateId),
  });

  if (!certificate) {
    notFound();
  }

  // Find intern
  const intern = await db.query.interns.findFirst({
    where: eq(interns.id, certificate.internId),
  });

  if (!intern) {
    notFound();
  }

  const qrCode = await QRCode.toDataURL(
  `${process.env.NEXT_PUBLIC_APP_URL}/verify/${intern.torsecureId}`
)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="w-[1000px] bg-white border-[12px] border-blue-700 rounded-xl p-14 shadow-2xl">

        <h2 className="text-center text-blue-700 text-xl font-semibold uppercase">
          TorSecure Technologies
        </h2>

        <h1 className="text-center text-5xl font-bold mt-6">
          Certificate of Internship
        </h1>

        <p className="text-center text-gray-600 mt-8 text-lg">
          This is to certify that
        </p>

        <h2 className="text-center text-4xl font-bold mt-4">
          {intern.fullName}
        </h2>

        <p className="text-center text-lg mt-8">
          has successfully completed the internship as
        </p>

        <h3 className="text-center text-2xl font-semibold mt-3">
         {intern.designation}
        </h3>

        <p className="text-center mt-8 text-lg">
          From <strong>{new Date(intern.startDate).toLocaleDateString()}</strong> to{" "}
          <strong>{new Date(intern.endDate).toLocaleDateString()}</strong>
        </p>

        <div className="flex justify-between mt-20">

          <div>
            <p className="font-semibold">Certificate ID</p>
            <p>{certificate.certificateId}</p>

            <p className="mt-6 font-semibold">
              Issue Date
            </p>
            <p>{new Date(certificate.issueDate).toLocaleDateString()}</p>
          </div>

          <div className="text-center">
               <img
                src={qrCode}
                alt="Certificate QR Code"
                className="w-32 h-32"
                />

            <p className="mt-4">
              Authorized Signature
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}