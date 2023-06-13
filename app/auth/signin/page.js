"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

// components
import Stack from "@mui/material/Stack";
import TextInput from "@/components/Auth/TextInput";
import Link from "next/link";

export default function Signin() {
  const auth = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const error = await auth.signin(credentials);
    if (error) {
      setError(error);
    }
    setLoading(false);
  };

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  return (
    <div className='w-full p-12'>
      <Stack spacing={3}>
        <Stack spacing={1} className='text-center'>
          <h1 className='text-3xl font-bold text-slate-800'>Sign In</h1>
        </Stack>
        <form className='w-full' onSubmit={handleSubmit}>
          <p className='text-sm text-red-400 mb-2'>{error}</p>
          <Stack spacing={2}>
            <TextInput
              id={"email"}
              placeholder={"Email"}
              type={"email"}
              handleCredentials={handleCredentials}
            />
            <TextInput
              id={"password"}
              placeholder={"Password"}
              type={"text"}
              handleCredentials={handleCredentials}
            />
            <Stack spacing={1} className='text-center'>
              <button
                type='submit'
                className='rounded-md w-full p-4 bg-slate-800 text-white'
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
              <p className='text-sm text-slate-500'>
                Don't have an account?{" "}
                <Link className='text-sky-400' href='/auth/signup'>
                  Sign Up
                </Link>
              </p>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </div>
  );
}
