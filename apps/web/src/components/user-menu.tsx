"use client";

import { ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useLocalStorage } from "usehooks-ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import type { Supplier } from "@/types/supplier";

export default function UserMenu() {
  const router = useRouter();
  const [suppliers] = useLocalStorage<Supplier[]>("supplier", [], {
    initializeWithValue: false,
  });
  const [session, setSession] = useLocalStorage<{ id: string } | null>(
    "session",
    null,
    { initializeWithValue: false },
  );

  const user = suppliers.find((supplier) => supplier.id === session?.id);

  const userInitials =
    user?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  if (!user) return null;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="group flex cursor-pointer items-center gap-3 bg-background/80 px-3 py-2 transition-all duration-200 hover:bg-background"
            type="button"
            variant="ghost"
          >
            <Avatar className="size-6 border border-border/50 transition-all duration-200 group-hover:border-border group-hover:shadow-sm">
              <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 font-semibold text-white text-xs transition-all duration-200 group-hover:from-primary/90 group-hover:to-primary/70">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-start sm:flex sm:flex-col">
              <span className="font-medium text-sm leading-none transition-colors duration-200 group-hover:text-foreground">
                {user?.fullName}
              </span>
              <span className="text-muted-foreground text-xs transition-colors duration-200 group-hover:text-muted-foreground/80">
                {user?.email}
              </span>
            </div>
            <ChevronDown className="size-4 text-muted-foreground transition-all duration-200 group-hover:text-foreground group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="fade-in-0 zoom-in-95 slide-in-from-top-2 w-60 animate-in"
        >
          <DropdownMenuLabel className="flex flex-col gap-1 py-3">
            <span className="font-semibold text-sm">{user?.fullName}</span>
            <span className="text-muted-foreground text-xs">{user?.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer text-destructive transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
            onClick={() => {
              setSession(null);
              router.push("/login" as Route);
            }}
          >
            <LogOut className="size-4 text-destructive transition-transform duration-150 group-hover:scale-110" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
