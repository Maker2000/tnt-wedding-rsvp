"use client";
import InputField from "@/components/InputField/InputField";
import React from "react";
import { useResetPassword } from "./reset-password.hook";
import Header from "@/components/Header";
import HideUnhideIcon from "@/components/HideUnhideIcon";
import { CircularProgress } from "@mui/material";

const ResetPassword = () => {
  const hook = useResetPassword();
  return (
    <Header title="Change Password">
      <div className="flex flex-col w-full max-w-3xl p-5">
        <form onSubmit={hook.submit} className="flex flex-col gap-4">
          <InputField
            id="currentPassword"
            name="currentPassword"
            type={`${hook.state.showOldPassword ? "text" : "password"}`}
            title="Current Password"
            disabled={hook.state.isLoading}
            onDataChange={hook.setOldPassword}
            icon={
              <HideUnhideIcon
                onClick={() => {
                  hook.toggleShowOldPassword();
                }}
              />
            }
          />
          <InputField
            id="newPassword"
            name="newPassword"
            type={`${hook.state.showNewPassword ? "text" : "password"}`}
            title="New Password"
            onDataChange={hook.setNewPassword}
            disabled={hook.state.isLoading}
            icon={
              <HideUnhideIcon
                onClick={() => {
                  hook.toggleShowNewPassword();
                }}
              />
            }
          />
          <InputField
            id="confirmNewPassword"
            name="confirmNewPassword"
            type={`${hook.state.showConfirmPassword ? "text" : "password"}`}
            title="Confirm New Password"
            onDataChange={hook.setConfirmNewPassword}
            disabled={hook.state.isLoading}
            icon={
              <HideUnhideIcon
                onClick={() => {
                  hook.toggleShowConfirmPassword();
                }}
              />
            }
          />
          {hook.state.isLoading ? (
            <CircularProgress className="self-center text-primary m-2" thickness={3} size={50} />
          ) : (
            <>
              <div className="text-red-500">{hook.state.errorMessage}</div>
              <input type="submit" value="Reset Password" disabled={!hook.canSubmit()} />
            </>
          )}
        </form>
      </div>
    </Header>
  );
};

export default ResetPassword;
