import { notFound } from "next/navigation";
import { db } from "@/db";
import { interns } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function ViewInternPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const intern = await db.query.interns.findFirst({
    where: eq(interns.id, Number(id)),
  });

  if (!intern) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Intern Details
          </h1>

          <p className="text-gray-500 mt-2">
            Complete information about the intern.
          </p>
        </div>

        <Link
          href={`/admin/interns/${intern.id}/edit`}
          className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
        >
          Edit
        </Link>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-xl shadow p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Info label="TorSecure ID" value={intern.torsecureId} />
          <Info label="Full Name" value={intern.fullName} />
          <Info label="Email" value={intern.email} />
          <Info label="Phone" value={intern.phone} />
          <Info label="College" value={intern.college} />
          <Info label="Designation" value={intern.designation} />
          <Info label="Status" value={intern.status} />
          <Info
            label="Start Date"
            value={new Date(intern.startDate).toLocaleDateString()}
          />
          <Info
            label="End Date"
            value={new Date(intern.endDate).toLocaleDateString()}
          />

        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}