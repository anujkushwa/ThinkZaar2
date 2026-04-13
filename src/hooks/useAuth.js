"use client";

export default function useAuth() {
  return {
    isAuthenticated: false,
    user: null,
  };
}
