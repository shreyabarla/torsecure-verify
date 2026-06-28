import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
async function getInterns() {
  const res = await fetch("http://localhost:3000/api/interns", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch interns");
  }

  const data = await res.json();
  return data.data;
}

export default async function InternsPage() {
  const interns = await getInterns();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Intern Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all internship records.
          </p>
        </div>

        <Link
          href="/admin/interns/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Add Intern
        </Link>
      </div>

      {/* Search */}
      <input
        placeholder="Search intern..."
        className="w-full rounded-lg border p-3"
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {interns.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  No interns found.
                </td>
              </tr>
            ) : (
              interns.map((intern: any) => (
                <tr key={intern.id} className="border-t">
                  <td className="p-4">{intern.torsecureId}</td>
                  <td>{intern.fullName}</td>
                  <td>{intern.email}</td>
                  <td>{intern.status}</td>

                  <td className="space-x-2">
                    <Link
                    href={`/admin/interns/${intern.id}`}
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                    View
                    </Link>

                    <Link
                    href={`/admin/interns/${intern.id}/edit`}
                    className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                    >
                    Edit
                    </Link>
                   <DeleteButton id={intern.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}