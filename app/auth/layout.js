export default function AuthLayout({ children }) {
  return (
    <section className='flex justify-center items-center h-screen'>
      <div className='rounded-md w-96 shadow-lg border-slate-200 border-2 h-fit'>
        {children}
      </div>
    </section>
  );
}
