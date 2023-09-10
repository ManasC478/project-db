"use client";

import { useSearchParams } from "next/navigation";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && (
        <p className='text-sm font-semibold text-red-400 mb-2'>{error}</p>
      )}
      {message && (
        <p className='text-sm font-semibold text-green-500 mb-2'>{message}</p>
      )}
    </>
  );
}
