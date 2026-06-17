import Header from "../layout/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className='min-h-screen bg-background transition-colors duration-300 flex flex-col'>
      <Header />
      <div className='fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(var(--color-muted)_1px,transparent_1px)] [background-size:16px_16px] opacity-40 dark:opacity-20'></div>

      <main className='flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out text-foreground'>
        <Outlet />
      </main>
    </div>
  );
}
