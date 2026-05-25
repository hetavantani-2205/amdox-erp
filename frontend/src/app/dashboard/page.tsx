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

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    fetchDashboard();
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

          <Link href="/dashboard">
            <div className="flex items-center gap-3 bg-blue-600 p-4 rounded-2xl cursor-pointer hover:scale-[1.02] transition">

              <LayoutDashboard size={22} />

              Dashboard

            </div>
          </Link>

          <Link href="/employees">
            <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl cursor-pointer transition">

              <Users size={22} />

              Employees

            </div>
          </Link>

          <Link href="/attendance">
            <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl cursor-pointer transition">

              <CalendarCheck size={22} />

              Attendance

            </div>
          </Link>

          <Link href="/payroll">
            <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl cursor-pointer transition">

              <IndianRupee size={22} />

              Payroll

            </div>
          </Link>

          <Link href="/settings">
            <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl cursor-pointer transition">

              <Settings size={22} />

              Settings

            </div>
          </Link>

        </div>

      </div>

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
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

              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

                H

              </div>

              <div>

                <h2 className="font-bold">
                  Hetav Antani
                </h2>

                <p className="text-sm text-gray-500">
                  Admin
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

        {/* RECENT EMPLOYEES */}
        <div className="bg-white rounded-3xl shadow-xl p-8 overflow-x-auto">

          <div className="flex justify-between mb-6">

            <h2 className="text-3xl font-bold">
              Recent Employees
            </h2>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-2xl hover:bg-blue-700 transition">

              View All

            </button>

          </div>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Role
                </th>

                <th className="text-left p-4">
                  Salary
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboard.recentEmployees.map(
                (employee: any) => (

                  <tr
                    key={employee.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-4 font-semibold">
                      {employee.name}
                    </td>

                    <td className="p-4">
                      {employee.email}
                    </td>

                    <td className="p-4">
                      {employee.role}
                    </td>

                    <td className="p-4">
                      ₹{employee.salary || 0}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>

);
}