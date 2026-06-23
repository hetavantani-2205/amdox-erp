"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleRegister = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      toast.error("Full name is required 👤");
      return;
    }

    if (!cleanEmail) {
      toast.error("Email address is required 📧");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
      toast.error("Enter a valid email address 📧");
      return;
    }

    if (!password) {
      toast.error("Password is required 🔒");
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must contain at least 6 characters 🔒"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Registration successful 🎉"
        );

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(
          data.message ||
            "Registration failed ❌"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Server error. Please try again later 🚨"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-cover
        bg-center
        relative
      "
      style={{
        backgroundImage:
          "url('/amdox-erp.png')",
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Card */}

      <div
        className="
          relative
          z-10
          w-[430px]
          bg-white/90
          backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          border border-white/30
          p-10
        "
      >
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

        {/* Name */}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
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
            focus:ring-green-500
          "
        />

        {/* Email */}

        <input
          type="email"
          placeholder="Email Address"
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
            focus:ring-green-500
          "
        />

        {/* Password */}

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
            focus:ring-green-500
          "
        />

        {/* Role */}

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
            focus:ring-green-500
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

        {/* Register Button */}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="
            w-full
            bg-green-600
            hover:bg-green-700
            disabled:bg-gray-400
            transition
            duration-300
            text-white
            font-semibold
            p-4
            rounded-xl
            shadow-lg
          "
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>

        {/* Login Link */}

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