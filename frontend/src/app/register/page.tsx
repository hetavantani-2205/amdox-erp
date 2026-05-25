"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");

  const handleRegister = async () => {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Registration Successful");

        router.push("/login");

      } else {

        alert(data.message || "Registration Failed");
      }

    } catch (error) {

      console.error(error);

      alert("Something went wrong");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          ERP Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        >

          <option value="EMPLOYEE">
            Employee
          </option>

          <option value="ADMIN">
            Admin
          </option>

        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Register
        </button>

        <p className="mt-5 text-center">

          Already have account?

          <Link
            href="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}