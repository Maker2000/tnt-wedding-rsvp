"use client";
import React, { Suspense } from "react";
import AdminLogin from "./admin-login";
import { useSearchParams } from "next/navigation";

function AdminLoginWrapper() {
  const params = useSearchParams();
  return (
    <Suspense>
      <AdminLogin nextUrl={params} />
    </Suspense>
  );
}

export default AdminLoginWrapper;
