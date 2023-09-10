import Link from "next/link";
import { Metadata } from "next";

// components
import TextInput from "@/components/TextInput";
import Messages from "../messages";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import GoogleSignIn from "../GoogleSignIn";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Signup() {
  return (
    <div className='w-full p-12'>
      <div className='flex flex-col space-y-5'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-slate-800'>Sign Up</h1>
          <p className='text-lg text-slate-500'>Create a new account</p>
        </div>
        <form
          action='/api/auth/signup-credentials'
          method='POST'
          className='w-full'
        >
          <Messages />
          <div className='flex flex-col space-y-2'>
            <TextInput
              id={"username"}
              name='username'
              placeholder={"Username"}
              type={"username"}
              required
            />
            <TextInput
              id={"email"}
              name='email'
              placeholder={"Email"}
              type={"email"}
              required
            />
            <TextInput
              id={"password"}
              name='password'
              placeholder={"Password"}
              type={"password"}
              required
            />
            <div className='flex flex-col space-y-5 text-center'>
              <Button type='submit' weight='font-semibold'>
                Sign Up
              </Button>
            </div>
          </div>
        </form>
        <div className='flex flex-col space-y-2'>
          <form action='/api/auth/signin-oauth?provider=google' method='POST'>
            <Button
              bgcolor='bg-transparent'
              textcolor='text-black'
              className='border-2 border-slate-300 flex space-x-3 items-center justify-center'
              weight='font-semibold'
              type='submit'
            >
              <Icon name='Google-Colored' />
              <p>Sign Up with Google</p>
            </Button>
          </form>
          <form action='/api/auth/signin-oauth?provider=github' method='POST'>
            <Button
              bgcolor='bg-transparent'
              textcolor='text-black'
              className='border-2 border-slate-300 flex space-x-3 items-center justify-center'
              weight='font-semibold'
              type='submit'
            >
              <Icon name='Github' />
              <p>Sign Up with Github</p>
            </Button>
          </form>
        </div>
        <p className='text-sm text-slate-500'>
          Already have an account?{" "}
          <Link className='text-sky-400' href='/auth/signin'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
