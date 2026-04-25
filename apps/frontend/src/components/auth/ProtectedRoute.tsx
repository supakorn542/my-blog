// apps/frontend/src/components/auth/ProtectedRoute.tsx
"use client";

import { useAuthStore } from "../../stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return <div>กำลังตรวจสอบสิทธิ์...</div>;

  return isAuthenticated ? <>{children}</> : null;
};
