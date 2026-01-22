"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [session] = useLocalStorage<{ id: string } | null>("session", null);

  useEffect(() => {
    if (!session) {
      router.push("/login" as Route);
    } else {
      router.push("/home" as Route);
    }
  }, [session, router]);

  return null;
}
