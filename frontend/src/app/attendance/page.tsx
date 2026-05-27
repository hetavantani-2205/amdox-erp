"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
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
  LogOut,
} from "lucide-react";

import {
  getRole,
} from "../../utils/role";

export default function AttendancePage() {

  const router = useRouter();

  const [attendance, setAttendance] =
    useState<any[]>([]);

  // ROLE PROTECTION

  useEffect(() => {

    const role = getRole();

    if (!role) {

      router.push("/login");

    }

    // DUMMY DATA

    setAttendance([
      {
        id: 1,
        name: "Rahul Sharma",
        department: "IT",
        status: "Present",
        checkIn: "09:05 AM",
      },
      {
        id: 2,
        name: "Priya Patel",
        department: "HR",
        status: "Absent",
        checkIn: "--",
      },
      {
        id: 3,
        name: "Amit Shah",
        department: "Finance",
        status: "Present",
        checkIn: "09:15 AM",
      },
    ]);

  }, []);

  // STATS

  const totalPresent =
    attendance.filter(
      (item) =>
        item.status === "Present"
    ).length;

  const totalAbsent =
    attendance.filter(
      (item) =>
        item.status === "Absent"
    ).length;

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

            {(
              getRole() ===
                "TENANT_ADMIN" ||
              getRole() ===
                "SUPER_ADMIN"
            ) && (

              <Link href="/employees">

                <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                  <Users size={22} />

                  Employees

                </div>

              </Link>

            )}

            {/* ATTENDANCE */}

            <Link href="/attendance">

              <div className="flex items-center gap-3 bg-blue-600 p-4 rounded-2xl transition">

                <CalendarCheck size={22} />

                Attendance

              </div>

            </Link>

            {/* PAYROLL */}

            {(
              getRole() ===
                "MANAGER" ||
              getRole() ===
                "TENANT_ADMIN" ||
              getRole() ===
                "SUPER_ADMIN"
            ) && (

              <Link href="/payroll">

                <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                  <IndianRupee size={22} />

                  Payroll

                </div>

              </Link>

            )}

            {/* MEETING */}

            <Link href="/meeting">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                🎥 Live Meeting

              </div>

            </Link>

            <Link href="/forecast">

  <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl cursor-pointer transition">

    🤖 AI Forecast

  </div>

</Link>

            {/* SETTINGS */}

            {
              getRole() ===
                "SUPER_ADMIN" && (

                <Link href="/settings">

                  <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                    <Settings size={22} />

                    Settings

                  </div>

                </Link>

              )
            }

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

            Attendance Management

          </h1>

          <p className="text-gray-500 mt-2">

            Real-time workforce attendance tracking

          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-8 rounded-3xl shadow-xl">

            <p className="text-lg">

              Present Employees

            </p>

            <h2 className="text-4xl font-bold mt-4">

              {totalPresent}

            </h2>

          </div>

          <div className="bg-gradient-to-r from-red-500 to-orange-400 text-white p-8 rounded-3xl shadow-xl">

            <p className="text-lg">

              Absent Employees

            </p>

            <h2 className="text-4xl font-bold mt-4">

              {totalAbsent}

            </h2>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-xl p-8 overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-gray-100">

                <th className="text-left p-5">
                  Employee
                </th>

                <th className="text-left p-5">
                  Department
                </th>

                <th className="text-left p-5">
                  Status
                </th>

                <th className="text-left p-5">
                  Check In
                </th>

              </tr>

            </thead>

            <tbody>

              {attendance.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-5 font-semibold">

                      {item.name}

                    </td>

                    <td className="p-5">

                      {item.department}

                    </td>

                    <td className="p-5">

                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-bold

                          ${
                            item.status ===
                            "Present"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }
                        `}
                      >

                        {item.status}

                      </span>

                    </td>

                    <td className="p-5">

                      {item.checkIn}

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