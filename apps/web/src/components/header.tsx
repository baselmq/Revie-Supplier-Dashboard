"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import RevieLogo from "./icons/revie-logo";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background">
      <div className="flex h-20 items-center gap-6 px-6">
        <Link href="/">
          <RevieLogo className="text-gray-900 dark:text-gray-50" />
        </Link>
        <div className="ms-auto flex items-center gap-3">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
