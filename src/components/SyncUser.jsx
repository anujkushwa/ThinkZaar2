"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SyncUser() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      fetch("/api/users", {
        method: "POST",
      });
    }
  }, [isLoaded, user]);

  return null;
}