"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface Employee {
  id: string;
  name: string;
  email: string;
  designation: string;
  salary: number;
  role: string;
}

export default function EmployeesPage() {

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

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    try {

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/employees`,
        {
          ...formData,
          salary: Number(formData.salary),
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
            <Link href="/employees">
              <div className="bg-slate-700 p-3 rounded-lg">
                Employees
              </div>
            </Link>
          </li>

          <li>
            <Link href="/projects">
              <div className="hover:bg-slate-700 p-3 rounded-lg">
                Projects
              </div>
            </Link>
          </li>

          <li>
            <Link href="/attendance">
              <div className="hover:bg-slate-700 p-3 rounded-lg">
                Attendance
              </div>
            </Link>
          </li>

          <li>
            <Link href="/payroll">
              <div className="hover:bg-slate-700 p-3 rounded-lg">
                Payroll
              </div>
            </Link>
          </li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            Employees
          </h1>

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            {showForm
              ? "Close Form"
              : "Add Employee"}
          </button>

        </div>

        {/* Employee Form */}

        {showForm && (

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md mb-10"
          >

            <h2 className="text-2xl font-bold mb-5">
              Add Employee
            </h2>

            <div className="grid grid-cols-3 gap-4">

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
                className="border p-3 rounded-lg"
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
                className="border p-3 rounded-lg"
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
                className="border p-3 rounded-lg"
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
                className="border p-3 rounded-lg"
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
                className="border p-3 rounded-lg"
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
                className="border p-3 rounded-lg"
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
              className="mt-5 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
            >
              Save Employee
            </button>

          </form>

        )}

        {/* Employee Table */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-gray-100">

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Designation
                </th>

                <th className="text-left p-4">
                  Salary
                </th>

                <th className="text-left p-4">
                  Role
                </th>

              </tr>

            </thead>

            <tbody>

              {employees.map((employee) => (

                <tr
                  key={employee.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {employee.name}
                  </td>

                  <td className="p-4">
                    {employee.email}
                  </td>

                  <td className="p-4">
                    {employee.designation}
                  </td>

                  <td className="p-4">
                    ₹{employee.salary}
                  </td>

                  <td className="p-4">
                    {employee.role}
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