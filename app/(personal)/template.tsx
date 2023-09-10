import Link from "next/link";
import { ReactNode } from "react";

// components
import Box from "@/components/Box";
import Icon from "@/components/Icon";

export default function PersonalTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='grid grid-cols-[250px_1fr] space-x-12'>
      <Box className='flex flex-col space-y-6 p-8 h-fit'>
        <p className='text-sm font-semibold'>Menu</p>
        <Link href='/dashboard'>
          <div className='flex space-x-3 items-center'>
            <Icon name='Dashboard' />
            <p>Dashboard</p>
          </div>
        </Link>
        <Link href='/profile'>
          <div className='flex space-x-3 items-center'>
            <Icon name='Profile' />
            <p>Profile</p>
          </div>
        </Link>
        <Link href='/settings'>
          <div className='flex space-x-3 items-center'>
            <Icon name='Settings' />
            <p>Settings</p>
          </div>
        </Link>
      </Box>
      <div className='max-w-[1000px]'>{children}</div>
    </div>
  );
}
