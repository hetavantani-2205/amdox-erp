'use client';

import { useState, useEffect } from 'react';

import { useRouter }
from 'next/navigation';

import Link from 'next/link';

export default function LoginPage() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [role, setRole] =
    useState('EMPLOYEE');

  const router = useRouter();

  // AUTO REDIRECT

  useEffect(() => {

    const token =
      localStorage.getItem('token');

    if (token) {

      router.push('/dashboard');

    }

  }, []);

  // LOGIN

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

      if (response.ok) {

        // SAVE TOKEN

        localStorage.setItem(
          'token',
          data.access_token
        );

        // SAVE ROLE

        localStorage.setItem(
          'role',
          data.user.role
        );

        localStorage.setItem(
  'name',
  data.user.name
);

localStorage.setItem(
  'email',
  data.user.email
);

        alert('Login Successful');

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

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/40" />

      {/* LOGIN CARD */}

      <div
        className="
          relative
          z-10
          w-[400px]
          bg-white/90
          backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          p-10
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            text-center
            mb-8
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
            rounded-2xl
            border
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
            rounded-2xl
            border
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
            rounded-2xl
            border
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
            text-white
            p-4
            rounded-2xl
            font-semibold
            transition
          "
        >

          Login

        </button>

        {/* REGISTER */}

        <p className="mt-6 text-center">

          Don&apos;t have an account?

          <Link
            href="/register"
            className="
              text-blue-600
              ml-2
              font-semibold
            "
          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );
}