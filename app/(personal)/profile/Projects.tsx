import Box from "@/components/Box";
import Button from "@/components/Button";

export default function Projects() {
  return (
    <Box className='flex flex-col gap-y-5 p-8'>
      <p className='text-xl font-bold'>Projects</p>
      <div className='flex flex-col gap-y-5'>
        <div className='flex justify-between items-center'>
          <div className='flex  items-center gap-x-5'>
            <div className='w-14 h-14 bg-slate-200 rounded-full'></div>
            <p className='text-lg'>Project name</p>
          </div>
          <div className='flex items-center gap-x-5'>
            <p className='font-semibold'>Owner</p>
            <p className='font-semibold text-sm text-sky-400 bg-sky-200 py-1 px-3 rounded-md'>
              In Progress
            </p>
            <p className='font-semibold text-sm text-green-500 bg-green-200 py-1 px-3 rounded-md'>
              Open
            </p>
            <Button>View</Button>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex  items-center gap-x-5'>
            <div className='w-14 h-14 bg-slate-200 rounded-full'></div>
            <p className='text-lg'>Project name</p>
          </div>
          <div className='flex items-center gap-x-5'>
            <p className='font-semibold'>Master Member</p>
            <p className='font-semibold text-sm text-sky-400 bg-sky-200 py-1 px-3 rounded-md'>
              In Progress
            </p>
            <p className='font-semibold text-sm text-green-500 bg-green-200 py-1 px-3 rounded-md'>
              Open
            </p>
            <Button>View</Button>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex  items-center gap-x-5'>
            <div className='w-14 h-14 bg-slate-200 rounded-full'></div>
            <p className='text-lg'>Project name</p>
          </div>
          <div className='flex items-center gap-x-5'>
            <p className='font-semibold'>Member</p>
            <p className='font-semibold text-sm text-sky-400 bg-sky-200 py-1 px-3 rounded-md'>
              In Progress
            </p>
            <p className='font-semibold text-sm text-green-500 bg-green-200 py-1 px-3 rounded-md'>
              Open
            </p>
            <Button>View</Button>
          </div>
        </div>
      </div>
    </Box>
  );
}
