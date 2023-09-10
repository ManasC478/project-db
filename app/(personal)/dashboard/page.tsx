import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <div className='flex flex-col gap-y-10'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <div className='flex flex-col gap-y-3'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl text-slate-800'>Your Projects</h2>
          <Link href='/dashboard'>
            <Button className='flex items-center gap-x-2' px='4'>
              <Icon name={"Add"} />
              <p className='font-semibold'>Create Project</p>
            </Button>
          </Link>
        </div>
        {/* <Suspense fallback={<p>Loading projects...</p>}>
          <ProjectList username={username} filter={"joined"} />
        </Suspense> */}
      </div>
      <div className='flex flex-col gap-y-3'>
        <h2 className='text-2xl text-slate-800'>Banned Projects</h2>
        {/* <Suspense fallback={<p>Loading projects...</p>}>
          <ProjectList username={username} filter={"banned"} />
        </Suspense> */}
      </div>
    </div>
  );
}
