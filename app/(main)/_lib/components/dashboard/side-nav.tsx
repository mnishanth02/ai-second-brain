"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardPen, FilesIcon, Search } from "lucide-react";

import { cn } from "@/lib/utils";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-6">
        <li>
          <Link
            className={cn(
              "flex items-center gap-2 text-xl font-light hover:text-primary dark:hover:text-primary",
              {
                "rounded-r-lg border-l-4 border-primary bg-secondary/50 px-2 py-1 text-primary dark:text-primary":
                  pathname.endsWith("/search"),
              }
            )}
            href="/dashboard/search"
          >
            <Search />
            Search
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex items-center gap-2 text-xl font-light hover:text-primary dark:hover:text-primary",
              {
                "rounded-r-lg border-l-4 border-primary bg-secondary/50 px-2 py-1 text-primary dark:text-primary":
                  pathname.includes("/files"),
              }
            )}
            href="/dashboard/files"
          >
            <FilesIcon />
            Documents
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex items-center gap-2 text-xl font-light hover:text-primary dark:hover:text-primary",
              {
                "rounded-r-lg border-l-4 border-primary bg-secondary/50 px-2 py-1 text-primary dark:text-primary":
                  pathname.includes("/notes"),
              }
            )}
            href="/dashboard/notes"
          >
            <ClipboardPen />
            Notes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
