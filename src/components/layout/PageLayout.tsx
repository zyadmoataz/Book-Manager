import { ReactNode } from "react";
import Header from "./Header";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 flex flex-col'>
      <Header />
      <div className='fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-slate-900 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 dark:opacity-20'></div>

      <main className='flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out text-slate-900 dark:text-slate-100'>
        {children}
      </main>
    </div>
  );
}
