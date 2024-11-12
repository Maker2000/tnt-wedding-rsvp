import { ApiResponseData } from "@/app/api/exception-filter";
import { ResetPasswordDto } from "@/app/models/user";
import { HttpClient } from "@/lib/http-client";
import { isEmptyInputValue } from "@/lib/util";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const useResetPassword = () => {
  const router = useRouter();

  const [dto, setDto] = useState<ResetPasswordDto>({ oldPassword: "", newPassword: "" });
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: "",
    confirmPassword: "",
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });
  const setOldPassword = (data: string) => {
    setDto((x) => (x = { ...x, oldPassword: data }));
  };
  const setNewPassword = (data: string) => {
    setDto((x) => (x = { ...x, newPassword: data }));
  };
  const setConfirmNewPassword = (data: string) => {
    setState((x) => (x = { ...x, confirmPassword: data }));
  };
  const canSubmit = (): boolean => {
    return (
      !isEmptyInputValue(state.confirmPassword) &&
      !isEmptyInputValue(dto.newPassword) &&
      !isEmptyInputValue(dto.newPassword) &&
      state.confirmPassword === dto.newPassword
    );
  };
  const toggleShowOldPassword = () => {
    setState(
      (x) =>
        (x = {
          ...x,
          showOldPassword: !state.showOldPassword,
        })
    );
  };
  const toggleShowNewPassword = () => {
    setState(
      (x) =>
        (x = {
          ...x,
          showNewPassword: !state.showNewPassword,
        })
    );
  };
  const toggleShowConfirmPassword = () => {
    setState(
      (x) =>
        (x = {
          ...x,
          showConfirmPassword: !state.showConfirmPassword,
        })
    );
  };
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(
      (x) =>
        (x = {
          ...x,
          isLoading: true,
        })
    );
    let res = await HttpClient.putData<ApiResponseData, ResetPasswordDto>("/api/admin/password-reset", dto);
    if (res.hasError()) {
      setState(
        (x) =>
          (x = {
            ...x,
            errorMessage: res.error!.message,
            isLoading: false,
          })
      );
    } else {
      setState(
        (x) =>
          (x = {
            ...x,

            isLoading: false,
          })
      );
      router.replace("/admin");
    }
  };

  return {
    submit,
    state,
    setOldPassword,
    setNewPassword,
    setConfirmNewPassword,
    canSubmit,
    toggleShowNewPassword,
    toggleShowOldPassword,
    toggleShowConfirmPassword,
  };
};
