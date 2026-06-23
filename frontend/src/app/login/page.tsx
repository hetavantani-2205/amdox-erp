'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [role, setRole] =
    useState('EMPLOYEE');

  const [loading, setLoading] =
    useState(false);

  const router = useRouter();

  // AUTO REDIRECT

  useEffect(() => {

    const token =
      localStorage.getItem('token');

    if (token) {

      router.push('/dashboard');

    }

  }, [router]);

  // LOGIN

  const handleLogin = async () => {

    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanEmail) {

      toast.error(
        'Email address is required 📧'
      );

      return;
    }

    if (
      !/\S+@\S+\.\S+/.test(
        cleanEmail
      )
    ) {

      toast.error(
        'Enter a valid email address 📧'
      );

      return;
    }

    if (!password) {

      toast.error(
        'Password is required 🔒'
      );

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            email: cleanEmail,
            password,
            role,
          }),
        }
      );

      const data =
        await response.json();

      if (response.ok) {

        localStorage.setItem(
          'token',
          data.access_token
        );

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

        toast.success(
          'Login successful 🚀'
        );

        setTimeout(() => {

          router.push(
            '/dashboard'
          );

        }, 1000);

      } else {

        toast.error(
          data.message ||
          'Invalid credentials ❌'
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        'Server error. Please try again later 🚨'
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
            backgroundSize: "cover",
            backgroundPosition: "center top",
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
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            w-full
            p-4
            mb-4
            rounded-2xl
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
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            p-4
            mb-4
            rounded-2xl
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
            setRole(
              e.target.value
            )
          }
          className="
            w-full
            p-4
            mb-6
            rounded-2xl
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
          disabled={loading}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-gray-400
            text-white
            p-4
            rounded-2xl
            font-semibold
            transition
          "
        >

          {loading
            ? 'Logging in...'
            : 'Login'}

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