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
} from "@/utils/role";

export default function PayrollPage() {

  const router = useRouter();

  const [payrolls, setPayrolls] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ROLE PROTECTION

  useEffect(() => {

    const role = getRole();

    if (
      role !== "MANAGER" &&
      role !== "TENANT_ADMIN" &&
      role !== "SUPER_ADMIN"
    ) {

      router.push("/dashboard");

    }

    fetchPayroll();

  }, []);

  // FETCH PAYROLL

  const fetchPayroll = async () => {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payroll`
      );

      const data =
        await response.json();

      setPayrolls(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Payroll Fetch Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // TOTAL PAYROLL

  const totalPayroll =
    payrolls.reduce(
      (acc, item) =>
        acc + item.netSalary,
      0
    );

  // TOTAL BONUS

  const totalBonus =
    payrolls.reduce(
      (acc, item) =>
        acc + item.bonus,
      0
    );

  if (loading) {

    return (

      <div className="p-10 text-2xl font-bold">

        Loading Payroll...

      </div>

    );
  }

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      {/* SIDEBAR */}

      <div className="w-72 bg-[#0B1120] text-white p-6 flex flex-col justify-between shadow-2xl">

        <div>

          <h1 className="text-4xl font-bold mb-12">

            Amdox ERP

          </h1>

          <div className="space-y-3">

            <Link href="/dashboard">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                <LayoutDashboard size={22} />

                Dashboard

              </div>

            </Link>

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

            <Link href="/attendance">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                <CalendarCheck size={22} />

                Attendance

              </div>

            </Link>

            <Link href="/payroll">

              <div className="flex items-center gap-3 bg-blue-600 p-4 rounded-2xl transition">

                <IndianRupee size={22} />

                Payroll

              </div>

            </Link>

            <Link href="/meeting">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                🎥 Live Meeting

              </div>

            </Link>

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

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">

              Payroll Management

            </h1>

            <p className="text-gray-500 mt-2">

              Enterprise salary system

            </p>

          </div>

          <button
            onClick={fetchPayroll}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl shadow-lg transition"
          >

            Refresh Payroll

          </button>

        </div>

        {/* KPI CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-8 rounded-3xl shadow-xl">

            <p className="text-lg">

              Total Payroll

            </p>

            <h2 className="text-4xl font-bold mt-4">

              ₹{totalPayroll}

            </h2>

          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-8 rounded-3xl shadow-xl">

            <p className="text-lg">

              Total Bonus

            </p>

            <h2 className="text-4xl font-bold mt-4">

              ₹{totalBonus}

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
                  Email
                </th>

                <th className="text-left p-5">
                  Month
                </th>

                <th className="text-left p-5">
                  Salary
                </th>

                <th className="text-left p-5">
                  Bonus
                </th>

                <th className="text-left p-5">
                  Net Salary
                </th>

                <th className="text-left p-5">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {
                Array.isArray(
                  payrolls
                ) &&
                payrolls.map(
                  (payroll: any) => (

                    <tr
                      key={payroll.id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      <td className="p-5 font-semibold">

                        {
                          payroll.employee
                            ?.name
                        }

                      </td>

                      <td className="p-5">

                        {
                          payroll.employee
                            ?.email
                        }

                      </td>

                      <td className="p-5">

                        {
                          payroll.month
                        }

                      </td>

                      <td className="p-5">

                        ₹{
                          payroll.basicSalary
                        }

                      </td>

                      <td className="p-5">

                        ₹{
                          payroll.bonus
                        }

                      </td>

                      <td className="p-5 font-bold text-green-600">

                        ₹{
                          payroll.netSalary
                        }

                      </td>

                      <td className="p-5">

                        <span
                          className={`
                            px-3 py-1 rounded-full text-xs font-bold

                            ${
                              payroll.status ===
                              "Paid"
                                ? "bg-green-100 text-green-600"
                                : "bg-orange-100 text-orange-600"
                            }
                          `}
                        >

                          {
                            payroll.status
                          }

                        </span>

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}