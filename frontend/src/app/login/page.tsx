'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/dist/client/link';

export default function LoginPage() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [role, setRole] =
    useState('EMPLOYEE');

  const router = useRouter();

  const handleLogin = async () => {

    try {

      const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            email,
            password,
            role,
          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (response.ok) {

        alert('Login Successful');

        localStorage.setItem(
          'token',
          data.access_token
        );

        localStorage.setItem(
          'role',
          data.user.role
        );

        router.push('/dashboard');

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert('Server Error');

    }
  };
return (

  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style={{
      backgroundImage: "url('/erp-bg.jpg')",
    }}
  >

    {/* DARK OVERLAY */}

    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

    {/* LOGIN CARD */}

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
        ERP Login
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

      {/* LOGIN BUTTON */}

      <button
        onClick={handleLogin}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          transition
          duration-300
          text-white
          font-semibold
          p-4
          rounded-xl
          shadow-lg
        "
      >
        Login
      </button>

      {/* REGISTER LINK */}

      <p className="mt-6 text-center text-gray-700">

        Don&apos;t have an account?

        <Link
          href="/register"
          className="
            text-blue-600
            ml-2
            font-semibold
            hover:underline
          "
        >
          Register
        </Link>

      </p>

    </div>

  </div>
);
}