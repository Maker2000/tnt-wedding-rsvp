"use client";

import HideUnhideIcon from "@/components/HideUnhideIcon";
import InputField from "@/components/InputField/InputField";
import React from "react";
import { useLoginHook } from "./login.hook";
import { CircularProgress } from "@mui/material";
import { ReadonlyURLSearchParams } from "next/navigation";
const AdminLogin = ({ nextUrl }: { nextUrl: ReadonlyURLSearchParams }) => {
  const hook = useLoginHook(nextUrl);
  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={hook.login} className="flex flex-col w-full lg:w-1/2 xl:w-1/3 p-8 m-3 gap-2 backdrop-blur-xl bg-primary-faded-50 rounded-2xl">
        <h1 className="text-4xl">Login</h1>
        <span className="mb-6">You're getting married soon, log in to see your guests!</span>
        <InputField type="email" title="Email" id="email" onDataChange={hook.setEmail} disabled={hook.state.isLoading} />
        <InputField
          type={`${hook.state.showPassword ? "text" : "password"}`}
          title="Password"
          id="password"
          onDataChange={hook.setPassword}
          disabled={hook.state.isLoading}
          icon={
            <HideUnhideIcon
              onClick={() => {
                hook.toggleShowPassword();
              }}
            />
          }
        />
        {/* <label htmlFor="rememberMe" className="text-right">
          Stay logged in:
          <input className="" type="checkbox" name="rememberMe" id="rememberMe" />
          <span></span>
        </label> */}
        {hook.state.isLoading ? (
          <CircularProgress className="self-center text-primary m-2" thickness={3} size={50} />
        ) : (
          <div className="flex flex-col">
            <div className="text-red-600">{hook.state.errorMessage}</div>
            <input
              className="bg-primary p-3 mt-6 rounded-xl hover:bg-primary-hover disabled:bg-gray-400 disabled:opacity-15 text-black"
              disabled={!hook.canLogin()}
              type="submit"
              value="Login"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
