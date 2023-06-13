"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// components
import { Stack } from "@mui/material";

export default function ClientError() {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className='text-center p-10'>
      <Stack spacing={3}>
        <p className='text-xl'>Client Error</p>
        <h1 className='text-9xl font-bold'>
          {searchParams.get("status") || "400"}
        </h1>
        <p className='text-md'>{searchParams.get("message") || "Unknown"}</p>
        <button
          className='text-sm py-2 bg-slate-900 text-white rounded-md'
          onClick={router.back}
        >
          Try Again
        </button>
        <Link href={"/"}>
          <button className='text-sm py-2 bg-slate-900 text-white rounded-md'>
            Go to home
          </button>
        </Link>
      </Stack>
    </div>
  );
}
