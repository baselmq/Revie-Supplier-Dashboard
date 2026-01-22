"use client";

import { Header } from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const [session] = useLocalStorage<{ id: string } | null>("session", null);

  useEffect(() => {
    if (!session) {
      router.push("/login" as Route);
    }
  }, [session, router]);

  return (
    <>
      <Header />
      <div className="flex w-full flex-1 overflow-hidden p-1">
        <ScrollArea className="w-full">
          <main className="mx-auto flex w-full flex-1 flex-col gap-6 px-6 md:px-15">
            {children}
          </main>
        </ScrollArea>
      </div>
    </>
  );
}
