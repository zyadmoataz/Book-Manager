import { Link, useLocation } from "react-router-dom";
import {
  BookMarked,
  Home,
  PlusCircle,
  Heart,
} from "lucide-react";
import { cn } from "@/utils/cn";
import ThemePanel from "../ui/ThemePanel";
import Search from "../ui/Search";
import Filter from "../ui/Filter";

export default function Header() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/add-book", label: "Add Book", icon: PlusCircle },
    { path: "/favorites", label: "Favorites", icon: Heart },
  ];

  return (
    <header className='sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* 1. App name */}
        <Link
          to='/'
          className='flex items-center gap-2 transition-transform hover:scale-105 active:scale-95'
        >
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-md shadow-primary-500/20'>
            <BookMarked className='h-6 w-6 text-white' />
          </div>
          <span className='text-xl font-bold tracking-tight text-slate-900'>
            Personal <span className='text-primary-600'>Book Manager</span>
          </span>
        </Link>

        {/* 2. Navigation links */}
        <nav>
          <ul className='flex items-center gap-1 sm:gap-4'>
            {navLinks.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <li key={path}>
                  <Link
                    to={path}
                    className={cn(
                      "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-transform group-hover:scale-110",
                        isActive
                          ? "text-primary-600"
                          : "text-slate-400 group-hover:text-slate-600",
                      )}
                    />
                    <span className='hidden sm:inline-block'>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 3. Search */}
        <Search />

        {/* 4. Filter */}
        <Filter />

        {/* 5. Theme Panel */}
        <ThemePanel />
      </div>
    </header>
  );
}
