"use client";
import { DisplayUser, IUser, LoginDto } from "@/app/models/user";
import { HttpClient } from "@/lib/http-client";
import { FormEvent, useState } from "react";
import { CookieKey } from "../models/enums";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { saveAdminCookie } from "@/lib/server-functions";
import { useAuthContext } from "../providers/auth.context";

export const useLoginHook = (nextUrl: ReadonlyURLSearchParams) => {
  const [dto, setDto] = useState<LoginDto>({ email: "", password: "" });
  const [state, setState] = useState({ showPassword: false, errorMessage: "", isLoading: false });
  const router = useRouter();

  const auth = useAuthContext();
  const toggleShowPassword = () => {
    setState(
      (x) =>
        (x = {
          ...x,
          showPassword: !state.showPassword,
        })
    );
  };
  const setEmail = (value: string) => {
    setDto({
      ...dto,
      email: value,
    });
  };
  const setPassword = (value: string) => {
    setDto({
      ...dto,
      password: value,
    });
  };
  const setErrorMessage = (value: string) => {
    setState((x) => (x = { ...x, errorMessage: value }));
  };
  const setIsLoading = (value: boolean) => {
    setState((x) => (x = { ...x, isLoading: value }));
  };
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    let res = await HttpClient.postData<IUser, LoginDto>("/api/admin/login", dto, async (res) => {
      await saveAdminCookie(res.get(CookieKey.adminToken));
    });
    if (res.hasError()) {
      setErrorMessage(res.error!.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setErrorMessage("");
      auth.setUser(new DisplayUser(res.data!));

      router.replace(nextUrl.get("next") ?? "/admin");
    }
  };
  const canLogin = () => {
    return dto.email.length > 0 && dto.password.length > 0;
  };
  return { dto, login, canLogin, setEmail, setPassword, toggleShowPassword, state };
};
