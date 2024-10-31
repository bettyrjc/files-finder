/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../shared/buttons/Button';
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)


    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      console.log("result", result)
      if(result?.ok){
        router.push("/")
      }

    } catch (error: any) {
      if (error.cause?.err instanceof Error) {
        return error.cause.err.message; // return "custom error"
      }
      setError("Ocurrió un error durante el inicio de sesión")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-blue-800">
            Sign in
          </h2>
          <p className='mt-2 text-gray-500'>Welcome back to Finder</p>
          <p className='text-gray-500 '>Ready to continue? Sign in to access your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div >
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className='mt-20 '>
            <Button type="submit"
              color="primary"
              size='large'
              loading={loading}
              disabled={loading}
            >
              Sign in
            </Button>
          </div>
          <div className='text-center text-red-500'>
            {error}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;