import { Link, useLocation } from "react-router-dom";
import { BookMarked, Home, PlusCircle, Heart } from "lucide-react";
import { cn } from "@/utils/cn";
import ThemePanel from "../ui/ThemePanel";
import Search from "../ui/Search";
import Filter from "../ui/Filter";
import { useAuth } from "@/providers/AuthProvider";

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, login, logout } = useAuth();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/add-book", label: "Add Book", icon: PlusCircle },
    { path: "/favorites", label: "Favorites", icon: Heart },
  ];

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/50 bg-surface/80 backdrop-blur-xl shadow-sm transition-colors duration-300'>
      <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Left Side: Logo & Nav */}
        <div className='flex items-center gap-8'>
          {/* App name */}
          <Link
            to='/'
            className='flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/30'>
              <BookMarked className='h-5 w-5 text-white' />
            </div>
            <span className='hidden lg:block text-xl font-bold tracking-tight text-foreground'>
              Personal{" "}
              <span className='text-primary-600 dark:text-primary-400'>
                Book Manager
              </span>
            </span>
          </Link>

          {/* Navigation links */}
          <nav className='hidden md:block'>
            <ul className='flex items-center gap-2'>
              {navLinks.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <li key={path}>
                    <Link
                      to={path}
                      className={cn(
                        "group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400 shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                          isActive
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      />
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Center: Search & Filter */}
        <div className='flex flex-1 items-center justify-center max-w-md px-6'>
          <div className='flex w-full items-center gap-3'>
            <div className='flex-1'>
              <Search />
            </div>
            <Filter />
          </div>
        </div>

        {/* Right Side: Auth & Theme */}
        <div className='flex items-center gap-3'>
          {/* Auth Button */}
          <button
            onClick={isAuthenticated ? logout : login}
            className='rounded-xl px-5 py-2 text-sm font-semibold text-foreground bg-muted hover:bg-muted/80 border border-border shadow-sm transition-all duration-200 active:scale-95'
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>

          {/* Theme Panel */}
          <div className='flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface shadow-sm'>
            <ThemePanel />
          </div>
        </div>
      </div>
    </header>
  );
}
