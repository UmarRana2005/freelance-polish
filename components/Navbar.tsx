"use client";

import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white/10 backdrop-blur-md shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-200"
        >
          FreelancePolish
        </Link>

        <ul className="hidden sm:flex items-center gap-6">
          <li>
            <Link
              href="/"
              className="text-slate-700 dark:text-slate-200 hover:text-slate-900 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/replies"
              className="text-slate-700 dark:text-slate-200 hover:text-slate-900 transition-colors"
            >
              Replies
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-slate-700 dark:text-slate-200 hover:text-slate-900 transition-colors"
            >
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            </Button>
            <span className="absolute -top-0.5 -right-0.5 inline-flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </div>

          {/* Pass a positioning class so ToggleTheme is inline instead of absolute */}
          <ToggleTheme className="static" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
