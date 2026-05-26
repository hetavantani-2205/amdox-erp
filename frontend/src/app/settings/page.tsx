"use client";

import Link from "next/link";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  IndianRupee,
  Settings,
  Shield,
  Database,
  Bell,
  LogOut,
} from "lucide-react";

import {
  getRole,
} from "../../utils/role";

export default function SettingsPage() {

  const router = useRouter();

  // ROLE PROTECTION

  useEffect(() => {

    const role = getRole();

    if (
      role !== "SUPER_ADMIN"
    ) {

      router.push("/dashboard");

    }

  }, []);

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      {/* SIDEBAR */}

      <div className="w-72 bg-[#0B1120] text-white p-6 flex flex-col justify-between shadow-2xl">

        <div>

          <h1 className="text-4xl font-bold mb-12">

            Amdox ERP

          </h1>

          <div className="space-y-3">

            {/* DASHBOARD */}

            <Link href="/dashboard">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                <LayoutDashboard size={22} />

                Dashboard

              </div>

            </Link>

            {/* EMPLOYEES */}

            <Link href="/employees">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                <Users size={22} />

                Employees

              </div>

            </Link>

            {/* ATTENDANCE */}

            <Link href="/attendance">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                <CalendarCheck size={22} />

                Attendance

              </div>

            </Link>

            {/* PAYROLL */}

            <Link href="/payroll">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                <IndianRupee size={22} />

                Payroll

              </div>

            </Link>

            {/* MEETING */}

            <Link href="/meeting">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                🎥 Live Meeting

              </div>

            </Link>

            {/* SETTINGS */}

            <Link href="/settings">

              <div className="flex items-center gap-3 bg-blue-600 p-4 rounded-2xl transition">

                <Settings size={22} />

                Settings

              </div>

            </Link>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            localStorage.removeItem(
              "role"
            );

            window.location.href =
              "/login";

          }}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 p-4 rounded-2xl transition"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-8">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold">

            ERP Settings

          </h1>

          <p className="text-gray-500 mt-2">

            Super Admin enterprise controls

          </p>

        </div>

        {/* SETTINGS GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* COMPANY */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-6">

              Company Details

            </h2>

            <div className="space-y-5">

              <div>

                <label className="block font-semibold mb-2">

                  Company Name

                </label>

                <input
                  type="text"
                  value="Amdox Technologies Ltd."
                  className="w-full border p-4 rounded-2xl"
                  readOnly
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">

                  Admin Email

                </label>

                <input
                  type="text"
                  value="admin@amdox.com"
                  className="w-full border p-4 rounded-2xl"
                  readOnly
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">

                  System Role

                </label>

                <input
                  type="text"
                  value="SUPER_ADMIN"
                  className="w-full border p-4 rounded-2xl"
                  readOnly
                />

              </div>

            </div>

          </div>

          {/* SECURITY */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-6">

              Security Controls

            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-4 bg-slate-100 p-5 rounded-2xl">

                <Shield className="text-blue-600" />

                <div>

                  <h3 className="font-bold">

                    JWT Authentication

                  </h3>

                  <p className="text-sm text-gray-500">

                    Active

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 bg-slate-100 p-5 rounded-2xl">

                <Database className="text-green-600" />

                <div>

                  <h3 className="font-bold">

                    PostgreSQL Database

                  </h3>

                  <p className="text-sm text-gray-500">

                    Connected

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 bg-slate-100 p-5 rounded-2xl">

                <Bell className="text-orange-500" />

                <div>

                  <h3 className="font-bold">

                    Notification Engine

                  </h3>

                  <p className="text-sm text-gray-500">

                    Running

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SYSTEM STATUS */}

        <div className="bg-black text-white rounded-3xl p-10 shadow-2xl">

          <h2 className="text-3xl font-bold mb-4">

            System Status

          </h2>

          <p className="text-gray-400 mb-6">

            Enterprise infrastructure running normally

          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white/10 p-6 rounded-2xl">

              <h3 className="text-lg font-semibold">

                Server

              </h3>

              <p className="text-green-400 mt-2">

                Online

              </p>

            </div>

            <div className="bg-white/10 p-6 rounded-2xl">

              <h3 className="text-lg font-semibold">

                API

              </h3>

              <p className="text-green-400 mt-2">

                Connected

              </p>

            </div>

            <div className="bg-white/10 p-6 rounded-2xl">

              <h3 className="text-lg font-semibold">

                Database

              </h3>

              <p className="text-green-400 mt-2">

                Healthy

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}