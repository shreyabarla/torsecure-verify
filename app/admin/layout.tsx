import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white">

        <div className="border-b border-slate-700 p-6">
          <h1 className="text-2xl font-bold">
            TorSecure
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Admin Portal
          </p>
        </div>

        <nav className="space-y-2 p-4">

          <Link
            href="/admin/dashboard"
            className="block rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/interns"
            className="block rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            Interns
          </Link>

          <Link
            href="#"
            className="block rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            Certificates
          </Link>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}