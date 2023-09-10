import Box from "@/components/Box";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex justify-center items-center h-full'>
      <Box className='w-96' borderwidth='border-2'>
        {children}
      </Box>
    </section>
  );
}
