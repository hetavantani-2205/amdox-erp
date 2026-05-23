"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-5">

        <h1 className="text-3xl font-bold mb-10">
          Amdox ERP
        </h1>

        <ul className="space-y-4">

          <li>
            <Link href="/dashboard">
              <div className="hover:bg-slate-700 p-3 rounded-lg">
                Dashboard
              </div>
            </Link>
          </li>

          <li>
            <Link href="/settings">
              <div className="bg-slate-700 p-3 rounded-lg">
                Settings
              </div>
            </Link>
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8">
          ERP Settings
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8 max-w-2xl">

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Company Name
            </label>

            <input
              type="text"
              value="Amdox Technologies Ltd."
              className="w-full border p-3 rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Admin Email
            </label>

            <input
              type="text"
              value="admin@amdox.com"
              className="w-full border p-3 rounded-lg"
              readOnly
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              System Role
            </label>

            <input
              type="text"
              value="TENANT_ADMIN"
              className="w-full border p-3 rounded-lg"
              readOnly
            />
          </div>

        </div>

      </div>
    </div>
  );
}