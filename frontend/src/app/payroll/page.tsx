"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PayrollPage() {

  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payroll`
      );

      const data = await response.json();

      setPayrolls(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Payroll Fetch Error:", error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-2xl font-bold">
        Loading Payroll...
      </div>
    );
  }

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
              <div className="hover:bg-slate-700 p-3 rounded-lg cursor-pointer">
                Dashboard
              </div>
            </Link>
          </li>

          <li>
            <Link href="/employees">
              <div className="hover:bg-slate-700 p-3 rounded-lg cursor-pointer">
                Employees
              </div>
            </Link>
          </li>

          <li>
            <Link href="/attendance">
              <div className="hover:bg-slate-700 p-3 rounded-lg cursor-pointer">
                Attendance
              </div>
            </Link>
          </li>

          <li>
            <Link href="/payroll">
              <div className="bg-slate-700 p-3 rounded-lg cursor-pointer">
                Payroll
              </div>
            </Link>
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Payroll Management
          </h1>

          <button
            onClick={fetchPayroll}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Refresh Payroll
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-gray-100">

                <th className="text-left p-4">
                  Employee
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Month
                </th>

                <th className="text-left p-4">
                  Salary
                </th>

                <th className="text-left p-4">
                  Bonus
                </th>

                <th className="text-left p-4">
                  Net Salary
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>

     <tbody>

  {Array.isArray(payrolls) &&
    payrolls.map((payroll: any) => (

      <tr
        key={payroll.id}
        className="border-b hover:bg-gray-50"
      >

        <td className="p-4 font-semibold">
          {payroll.employee?.name}
        </td>

        <td className="p-4">
          {payroll.employee?.email}
        </td>

        <td className="p-4">
          {payroll.month}
        </td>

        <td className="p-4">
          ₹{payroll.basicSalary}
        </td>

        <td className="p-4">
          ₹{payroll.bonus}
        </td>

        <td className="p-4 font-semibold text-green-600">
          ₹{payroll.netSalary}
        </td>

        <td
          className={`p-4 font-bold ${
            payroll.status === "Paid"
              ? "text-green-600"
              : "text-orange-500"
          }`}
        >
          {payroll.status}
        </td>

      </tr>

    ))}

</tbody>

          </table>

        </div>

      </div>
    </div>
  );
}