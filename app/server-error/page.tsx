"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function ServerError() {
  const router = useRouter();
  return (
    <div className='text-center p-10'>
      <div className='flex flex-col space-y-5'>
        <p className='text-xl'>Internal Error</p>
        <h1 className='text-9xl font-bold'>500</h1>
        <p className='text-md'>
          There seems to be an error with our servers. Please try again later.
        </p>
        <Button onClick={router.back}>Try Again</Button>
      </div>
    </div>
  );
}
