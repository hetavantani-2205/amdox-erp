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
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f3f4f6',
      }}
    >

      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          width: '350px',
          boxShadow:
            '0 0 20px rgba(0,0,0,0.1)',
        }}
      >

        <h1
          style={{
            textAlign: 'center',
            marginBottom: '20px',
          }}
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
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '10px',
          }}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '10px',
          }}
        />

        {/* ROLE */}

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '10px',
          }}
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

        {/* BUTTON */}

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '20px',
            background: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>

        <p className="mt-5 text-center">

  Don&apos;t have an account?

  <Link
    href="/register"
    className="text-blue-600 ml-2"
  >
    Register
  </Link>

</p>

      </div>

    </div>
  );
}