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

  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style={{
      backgroundImage: "url('/amdox-erp.png')",
    }}
  >

    {/* DARK OVERLAY */}

    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

    {/* Registration CARD */}

    <div
      className="
        relative z-10
        w-[400px]
        bg-white/90
        backdrop-blur-xl
        rounded-3xl
        shadow-2xl
        border border-white/30
        p-10
      "
    >

      {/* HEADING */}

      <h1
        className="
          text-4xl
          font-bold
          text-center
          mb-8
          text-slate-900
        "
      >
        ERP Registration
      </h1>

      {/* EMAIL */}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="
          w-full
          p-4
          mb-4
          rounded-xl
          border
          border-gray-300
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      {/* PASSWORD */}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="
          w-full
          p-4
          mb-4
          rounded-xl
          border
          border-gray-300
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      {/* ROLE */}

      <select
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
        className="
          w-full
          p-4
          mb-6
          rounded-xl
          border
          border-gray-300
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
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

        <option value="SUPER_ADMIN">
          SUPER_ADMIN
        </option>

      </select>

      {/* REGISTER BUTTON */}

      <button
        onClick={handleRegister}
        className="
          w-full
          bg-green-600
          hover:bg-green-700
          transition
          duration-300
          text-white
          font-semibold
          p-4
          rounded-xl
          shadow-lg
        "
      >
        Register
      </button>

      {/* REGISTER LINK */}

      <p className="mt-6 text-center text-gray-700">

        Already have an account?

        <Link
          href="/login"
          className="
            text-blue-600
            ml-2
            font-semibold
            hover:underline
          "
        >
          Login
        </Link>

      </p>

    </div>

  </div>
);
}