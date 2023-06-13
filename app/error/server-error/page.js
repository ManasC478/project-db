"use client";
import { useRouter } from "next/navigation";

// components
import { Stack } from "@mui/material";

export default function ServerError() {
  const router = useRouter();
  return (
    <div className='text-center p-10'>
      <Stack spacing={3}>
        <p className='text-xl'>Internal Error</p>
        <h1 className='text-9xl font-bold'>500</h1>
        <p className='text-md'>
          There seems to be an error with our servers. Please try again later.
        </p>
        <button
          className='text-sm py-2 bg-slate-900 text-white rounded-md'
          onClick={router.back}
        >
          Try Again
        </button>
      </Stack>
    </div>
  );
}
