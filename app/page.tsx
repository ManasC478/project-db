export const dynamic = "force-dynamic";

const verifyCode = async (code: string) => {
  await fetch(`http://localhost:3000/api/auth/verify-email?code=${code}`);
};

export default async function Index({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  if (searchParams?.code) {
    await verifyCode(searchParams?.code);
  }
  return <div className='w-full flex flex-col items-center'>HOME</div>;
}
