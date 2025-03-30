"use client";
import Header from "@/app/components/Header";
import NavLink from "@/app/components/NavLink";
import { useAuthContext } from "@/app/providers/auth.context";
import { logout } from "@/lib/server-functions";
import { Divider } from "@mui/material";
import { redirect } from "next/navigation";
import React from "react";

function Reminders() {
  const auth = useAuthContext();
  return (
    <div>
      <Header title="Settings">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:basis-1/3 flex flex-col bg-background rounded-xl p-4">
            <div className="flex flex-row text-2xl font-semibold">
              {auth.authState!.user?.firstName} {auth.authState!.user?.lastName} ({auth.authState!.user?.nickname!()})
            </div>
            <div className="flex flex-row">{auth.authState!.user?.username}</div>
            {/* <Divider className="my-5 bg-gray-500" />
            <div>Admin Messages</div>
            <div className="flex flex-col gap-3">
              {auth.authState!.user?.adminMessages.map((x) => {
                return <MessageCard key={x.from.id + x.message} message={x} />;
              })}
            </div>
            <Divider className="my-96 bg-gray-500" />
            <div>Guest Messages</div>
            <div className="flex flex-col gap-3">
              {auth.authState!.user?.guestMessages.map((x) => {
                return <MessageCard key={x.from.id + x.message} message={x} />;
              })}
            </div> */}
          </div>
          <div className="md:basis-2/3 flex flex-col bg-background rounded-xl p-4">
            <NavLink page="/admin/settings/reset-password">
              <>Change Password</>
            </NavLink>
            <Divider className=" bg-gray-500" />
            <NavLink
              onClick={() => {
                logout().then(() => {
                  auth.setUser(null);
                  redirect("/login");
                });
              }}>
              <>Logout</>
            </NavLink>
          </div>
        </div>
      </Header>
    </div>
  );
}

export default Reminders;
