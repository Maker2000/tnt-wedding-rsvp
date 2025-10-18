import React, { Suspense } from "react";
import AdminLoginClient from "./AdminLoginClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Loading…</div>}>
      <AdminLoginClient />
    </Suspense>
  );
}
