"use client";
import HideUnhideIcon from "@/app/components/HideUnhideIcon";
import InputField from "@/app/components/InputField/InputField";
import { Visibility } from "@mui/icons-material";
import React from "react";
import { useLoginHook } from "./login.hook";

const AdminLogin = () => {
  const hook = useLoginHook();
  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={hook.login} className="flex flex-col w-full lg:w-1/2 xl:w-1/3 p-8 m-3 gap-2 backdrop-blur-xl bg-primary-faded-50 rounded-2xl">
        <h1 className="text-4xl">Login</h1>
        <span className="mb-6">You're getting married soon, log in to see your guests!</span>
        <InputField type="email" title="Email" name="email" onChange={hook.setEmail} />
        <InputField
          type={`${hook.showPassword ? "text" : "password"}`}
          title="Password"
          name="password"
          onChange={hook.setPassword}
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
        <input
          className="bg-primary p-3 mt-6 rounded-xl hover:bg-primary-hover disabled:bg-gray-400 disabled:opacity-15 text-black"
          disabled={!hook.canLogin()}
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default AdminLogin;
