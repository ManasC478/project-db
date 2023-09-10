"use client";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientError() {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className='text-center p-10'>
      <div className='flex flex-col space-y-5'>
        <p className='text-xl'>Client Error</p>
        <h1 className='text-9xl font-bold'>
          {searchParams.get("status") || "400"}
        </h1>
        <p className='text-md'>{searchParams.get("error") || "Unknown"}</p>
        <Button className='text-sm' onClick={router.back}>
          Try Again
        </Button>
        <Link href={"/"}>
          <Button className='text-sm'>Go to home</Button>
        </Link>
      </div>
    </div>
  );
}
