"use client";

import { Header } from "@/components/header";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function PublicLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const [session] = useLocalStorage<{ id: string } | null>("session", null);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
