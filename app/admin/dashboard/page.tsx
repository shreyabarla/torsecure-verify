import Link from "next/link";
import {
  Users,
  UserCheck,
  ClipboardCheck,
} from "lucide-react";

async function getDashboardData() {
  const res = await fetch("http://localhost:3000/api/dashboard", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const data = await res.json();
  return data.data;
}

export default async function DashboardPage() {
  const dashboard = await getDashboardData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome to the TorSecure Admin Portal 👋
          </p>
        </div>

        <Link
          href="/admin/interns/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          + Add Intern
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow">
          <div>
            <p className="text-sm text-gray-500">Total Interns</p>
            <h2 className="mt-2 text-3xl font-bold">
              {dashboard.totalInterns}
            </h2>
          </div>

          <Users className="h-10 w-10 text-blue-600" />
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow">
          <div>
            <p className="text-sm text-gray-500">Active Interns</p>
            <h2 className="mt-2 text-3xl font-bold">
              {dashboard.activeInterns}
            </h2>
          </div>

          <UserCheck className="h-10 w-10 text-green-600" />
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow">
          <div>
            <p className="text-sm text-gray-500">Completed Interns</p>
            <h2 className="mt-2 text-3xl font-bold">
              {dashboard.completedInterns}
            </h2>
          </div>

          <ClipboardCheck className="h-10 w-10 text-yellow-600" />
        </div>
      </div>

      {/* Recent Interns */}
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Recent Interns
          </h2>

          <Link
            href="/admin/interns"
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        {dashboard.recentInterns.length === 0 ? (
          <p className="text-gray-500">No interns added yet.</p>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentInterns.map((intern: any) => (
                <tr key={intern.id} className="border-b">
                  <td className="py-3">{intern.torsecureId}</td>
                  <td>{intern.fullName}</td>
                  <td>{intern.designation}</td>
                  <td>{intern.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}