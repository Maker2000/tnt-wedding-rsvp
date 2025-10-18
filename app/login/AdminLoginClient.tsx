"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import AdminLogin from "./admin-login";

export default function AdminLoginClient() {
  const params = useSearchParams();
  return <AdminLogin nextUrl={params} />;
}
