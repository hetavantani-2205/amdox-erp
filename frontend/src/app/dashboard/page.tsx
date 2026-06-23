"use client";

import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  IndianRupee,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";

import {
  getRole,
} from "../../utils/role";

import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [dashboard, setDashboard] =
    useState<any>(null);

    const [name, setName] =
  useState("");

const [role, setRole] =
  useState("");

  useEffect(() => {

    fetchDashboard();

    setTimeout(() => {

      toast.success(
        "New employee joined successfully"
      );

    }, 3000);

    setTimeout(() => {

      toast(
        "Payroll generated successfully"
      );

    }, 6000);

    setTimeout(() => {

      toast.error(
        "Project deadline approaching"
      );

    }, 9000);

    setName(
  localStorage.getItem("name") || ""
);

setRole(
  localStorage.getItem("role") || ""
);

  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
      );

      setDashboard(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!dashboard) {

    return <div>Loading...</div>;

  }

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      {/* SIDEBAR */}

      <div className="w-72 bg-[#0B1120] text-white p-6 flex flex-col justify-between shadow-2xl">

        <div>

          <h1 className="text-4xl font-bold mb-12 tracking-tight">

            Amdox ERP

          </h1>

          <div className="space-y-3">

            {/* DASHBOARD */}

            <Link href="/dashboard">

              <div className="flex items-center gap-3 bg-blue-600 p-4 rounded-2xl cursor-pointer hover:scale-[1.02] transition">

                <LayoutDashboard size={22} />

                Dashboard

              </div>

            </Link>

            {/* EMPLOYEES */}

            {(
              getRole() === "TENANT_ADMIN" ||
              getRole() === "SUPER_ADMIN"
            ) && (

              <Link href="/employees">

                <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl cursor-pointer transition">

                  <Users size={22} />

                  Employees

                </div>

              </Link>

            )}

            {/* ATTENDANCE */}

            <Link href="/attendance">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl cursor-pointer transition">

                <CalendarCheck size={22} />

                Attendance

              </div>

            </Link>

            {/* PAYROLL */}

            {(
              getRole() === "MANAGER" ||
              getRole() === "TENANT_ADMIN" ||
              getRole() === "SUPER_ADMIN"
            ) && (

              <Link href="/payroll">

                <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl cursor-pointer transition">

                  <IndianRupee size={22} />

                  Payroll

                </div>

              </Link>

            )}

            {/* LIVE MEETING */}

            <Link href="/meeting">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl cursor-pointer transition">

                🎥 Live Meeting

              </div>

            </Link>

            {/* SETTINGS */}

            {(
              getRole() === "SUPER_ADMIN"
            ) && (

              <Link href="/settings">

                <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl cursor-pointer transition">

                  <Settings size={22} />

                  Settings

                </div>

              </Link>

            )}

          </div>

        </div>

        {/* LOGOUT */}

        <button
          onClick={() => {

            localStorage.removeItem("token");
            localStorage.removeItem("role");

            window.location.href = "/login";

          }}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 p-4 rounded-2xl transition"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-8 overflow-x-hidden">

        <div className="max-w-7xl mx-auto">

          {/* TOP NAVBAR */}

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-5xl font-bold tracking-tight">

                ERP Dashboard

              </h1>

              <p className="text-gray-500 mt-2">

                Welcome back to your enterprise workspace

              </p>

            </div>

            <div className="flex items-center gap-5">

              {/* NOTIFICATION */}

              <div className="bg-white p-4 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition">

                <Bell />

              </div>

              {/* PROFILE */}

              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-md">

                <div
  className="
    w-12
    h-12
    rounded-full
    bg-blue-600
    text-white
    flex
    items-center
    justify-center
    font-bold
    text-lg
  "
>
  {name?.charAt(0).toUpperCase()}
</div>

                <div>

                  <h2 className="font-bold">

                    {name}

                  </h2>

                  <p className="text-sm text-gray-500">

                    {role}

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* KPI CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition duration-300">

              <p className="text-lg">

                Employees

              </p>

              <h2 className="text-4xl font-bold mt-4">

                {dashboard.employees}

              </h2>

            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition duration-300">

              <p className="text-lg">

                Projects

              </p>

              <h2 className="text-4xl font-bold mt-4">

                {dashboard.projects}

              </h2>

            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition duration-300">

              <p className="text-lg">

                Attendance

              </p>

              <h2 className="text-4xl font-bold mt-4">

                {dashboard.attendance}%

              </h2>

            </div>

            <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition duration-300">

              <p className="text-lg">

                Payroll

              </p>

              <h2 className="text-3xl font-bold mt-4">

                ₹{dashboard.payroll}

              </h2>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-3xl font-bold">
      🤖 AI Workforce Insights
    </h2>

    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
      AI Generated
    </span>

  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl">

      <p className="text-gray-500">
        Active Employees
      </p>

      <h3 className="text-3xl font-bold text-blue-700 mt-2">
        10
      </h3>

    </div>

    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl">

      <p className="text-gray-500">
        Attendance Rate
      </p>

      <h3 className="text-3xl font-bold text-green-700 mt-2">
        92%
      </h3>

    </div>

    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-2xl">

      <p className="text-gray-500">
        Payroll Status
      </p>

      <h3 className="text-xl font-bold text-yellow-700 mt-2">
        Generated Successfully
      </h3>

    </div>

    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl">

      <p className="text-gray-500">
        Highest Salary
      </p>

      <h3 className="text-3xl font-bold text-purple-700 mt-2">
        ₹80,000
      </h3>

    </div>

    <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-2xl">

      <p className="text-gray-500">
        Next Payroll Cycle
      </p>

      <h3 className="text-xl font-bold text-pink-700 mt-2">
        July 2026
      </h3>

    </div>

    <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-2xl">

      <p className="text-gray-500">
        AI Recommendation
      </p>

      <h3 className="text-lg font-bold text-indigo-700 mt-2">
        Workforce Performance Stable
      </h3>

    </div>

  </div>

</div>

          {/* SUPER ADMIN CARD */}

          {(
            getRole() === "SUPER_ADMIN"
          ) && (

            <div className="bg-black text-white rounded-3xl p-8 mb-10 shadow-2xl">

              <h2 className="text-3xl font-bold">

                SUPER ADMIN CONTROL

              </h2>

              <p className="text-gray-400 mt-2">

                Full enterprise access enabled

              </p>

            </div>

          )}
        </div>

      </div>

    </div>

  );
}