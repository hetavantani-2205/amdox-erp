"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

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
  Trash2,
} from "lucide-react";

import {
  getRole,
} from "@/utils/role";

interface Employee {

  id: string;

  name: string;

  email: string;

  designation: string;

  salary: number;

  role: string;

}

export default function EmployeesPage() {

  const router = useRouter();

  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [showForm, setShowForm] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      designation: "",
      salary: "",
      role: "EMPLOYEE",
    });

  // ROLE PROTECTION

  useEffect(() => {

    const role = getRole();

    if (
      role !== "TENANT_ADMIN" &&
      role !== "SUPER_ADMIN"
    ) {

      router.push("/dashboard");

    }

    fetchEmployees();

  }, []);

  // FETCH EMPLOYEES

  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/employees`
      );

      setEmployees(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // ADD EMPLOYEE

  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    try {

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/employees`,
        {
          ...formData,
          salary: Number(
            formData.salary
          ),
        }
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        designation: "",
        salary: "",
        role: "EMPLOYEE",
      });

      fetchEmployees();

      setShowForm(false);

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE EMPLOYEE

  const deleteEmployee = async (
    id: string
  ) => {

    try {

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/employees/${id}`
      );

      fetchEmployees();

    } catch (error) {

      console.log(error);

    }
  };

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

            <Link href="/employees">

              <div className="flex items-center gap-3 bg-blue-600 p-4 rounded-2xl transition">

                <Users size={22} />

                Employees

              </div>

            </Link>

            <Link href="/attendance">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

                <CalendarCheck size={22} />

                Attendance

              </div>

            </Link>

            <Link href="/payroll">

              <div className="flex items-center gap-3 hover:bg-slate-800 p-4 rounded-2xl transition">

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

              Employees

            </h1>

            <p className="text-gray-500 mt-2">

              Manage enterprise workforce

            </p>

          </div>

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl shadow-lg transition"
          >

            {
              showForm
                ? "Close Form"
                : "Add Employee"
            }

          </button>

        </div>

        {/* FORM */}

        {showForm && (

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl p-8 mb-10"
          >

            <h2 className="text-3xl font-bold mb-6">

              Add Employee

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="text"
                placeholder="Designation"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    designation: e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <input
                type="number"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
                required
              />

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
                className="border p-4 rounded-2xl"
              >

                <option value="EMPLOYEE">
                  EMPLOYEE
                </option>

                <option value="MANAGER">
                  MANAGER
                </option>

                <option value="TENANT_ADMIN">
                  TENANT_ADMIN
                </option>

              </select>

            </div>

            <button
              type="submit"
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl transition"
            >

              Save Employee

            </button>

          </form>

        )}

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-xl p-8 overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-gray-100">

                <th className="text-left p-5">
                  Name
                </th>

                <th className="text-left p-5">
                  Email
                </th>

                <th className="text-left p-5">
                  Designation
                </th>

                <th className="text-left p-5">
                  Salary
                </th>

                <th className="text-left p-5">
                  Role
                </th>

                <th className="text-left p-5">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {employees.map(
                (employee) => (

                  <tr
                    key={employee.id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-5 font-semibold">

                      {employee.name}

                    </td>

                    <td className="p-5">

                      {employee.email}

                    </td>

                    <td className="p-5">

                      {employee.designation}

                    </td>

                    <td className="p-5">

                      ₹{
                        employee.salary ||
                        50000
                      }

                    </td>

                    <td className="p-5">

                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-bold

                          ${
                            employee.role ===
                            "SUPER_ADMIN"
                              ? "bg-red-100 text-red-600"
                            : employee.role ===
                              "TENANT_ADMIN"
                              ? "bg-purple-100 text-purple-600"
                            : employee.role ===
                              "MANAGER"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          }
                        `}
                      >

                        {employee.role}

                      </span>

                    </td>

                    <td className="p-5">

                      <button
                        onClick={() =>
                          deleteEmployee(
                            employee.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
                      >

                        <Trash2 size={18} />

                      </button>

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