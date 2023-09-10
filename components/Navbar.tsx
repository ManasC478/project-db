import Link from "next/link";
import { cookies } from "next/headers";
import {
  createServerComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";

// components
import ProfileNav from "./ProfileNav";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  }: { data: { user: User | null } } = await supabase.auth.getUser();

  return (
    <div>
      <div className='flex justify-between items-center px-12 py-5 lg:px-0'>
        <div className='flex gap-x-20'>
          <div className='font-bold'>
            <Link href='/'>
              <h1>ProjectDB</h1>
            </Link>
          </div>
          <div className='text-sm font-normal flex gap-x-10'>
            <Link href='/dashboard'>
              <p>Dashboard</p>
            </Link>
            <p>Projects</p>
            <p>Members</p>
          </div>
        </div>
        {user ? (
          <ProfileNav user={user} />
        ) : (
          <div className='flex gap-x-3 text-sm font-semibold'>
            <Link href='/auth/signin'>
              <button className='px-4 py-2 bg-violet-300 text-white rounded-md text-center'>
                Sign in
              </button>
            </Link>
            <Link href='/auth/signup'>
              <button className='px-4 py-2 bg-slate-900 text-white rounded-md text-center'>
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
