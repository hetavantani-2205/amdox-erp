"use client";

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
        "http://localhost:5000/dashboard"
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
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-slate-950 text-white p-5">

        <h1 className="text-3xl font-bold mb-10">
          Amdox ERP
        </h1>

        <ul className="space-y-4">

          <li>
            <Link href="/dashboard">
              <div className="bg-blue-600 p-3 rounded-xl">
                Dashboard
              </div>
            </Link>
          </li>

          <li>
            <Link href="/employees">
              <div className="hover:bg-slate-800 p-3 rounded-xl">
                Employees
              </div>
            </Link>
          </li>

          <li>
            <Link href="/projects">
              <div className="hover:bg-slate-800 p-3 rounded-xl">
                Projects
              </div>
            </Link>
          </li>

          <li>
            <Link href="/attendance">
              <div className="hover:bg-slate-800 p-3 rounded-xl">
                Attendance
              </div>
            </Link>
          </li>

          <li>
            <Link href="/payroll">
              <div className="hover:bg-slate-800 p-3 rounded-xl">
                Payroll
              </div>
            </Link>
          </li>

        </ul>

      </div>

      {/* Main */}
      <div className="flex-1 p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-2">
              ERP Dashboard
            </h1>

            <p className="text-gray-500">
              Welcome to enterprise management panel
            </p>

          </div>

          <div className="bg-white px-6 py-4 rounded-2xl shadow-md">
            <p className="text-gray-500 text-sm">
              Active Users
            </p>

            <h2 className="text-3xl font-bold">
              {dashboard.employees}
            </h2>
          </div>

        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-3xl shadow-lg">

            <p className="text-lg">
              Employees
            </p>

            <h2 className="text-4xl font-bold mt-4">
              {dashboard.employees}
            </h2>

          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 rounded-3xl shadow-lg">

            <p className="text-lg">
              Projects
            </p>

            <h2 className="text-4xl font-bold mt-4">
              {dashboard.projects}
            </h2>

          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 rounded-3xl shadow-lg">

            <p className="text-lg">
              Attendance
            </p>

            <h2 className="text-4xl font-bold mt-4">
              {dashboard.attendance}%
            </h2>

          </div>

          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white p-6 rounded-3xl shadow-lg">

            <p className="text-lg">
              Payroll
            </p>

            <h2 className="text-3xl font-bold mt-4">
              ₹{dashboard.payroll}
            </h2>

          </div>

        </div>

        {/* Recent Employees */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex justify-between mb-6">

            <h2 className="text-3xl font-bold">
              Recent Employees
            </h2>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl">
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
                    className="border-b hover:bg-gray-50"
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
  );
}