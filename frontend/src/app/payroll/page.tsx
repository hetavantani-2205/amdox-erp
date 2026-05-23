import Link from "next/link";

export default function PayrollPage() {
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

        <h1 className="text-4xl font-bold mb-8">
          Payroll Management
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-gray-100">

                <th className="text-left p-4">
                  Employee
                </th>

                <th className="text-left p-4">
                  Department
                </th>

                <th className="text-left p-4">
                  Salary
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">
                <td className="p-4">Rahul Sharma</td>
                <td className="p-4">IT</td>
                <td className="p-4">₹50,000</td>
                <td className="p-4 text-green-600 font-bold">
                  Paid
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4">Priya Patel</td>
                <td className="p-4">HR</td>
                <td className="p-4">₹45,000</td>
                <td className="p-4 text-orange-500 font-bold">
                  Pending
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-4">Amit Shah</td>
                <td className="p-4">Finance</td>
                <td className="p-4">₹60,000</td>
                <td className="p-4 text-green-600 font-bold">
                  Paid
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}