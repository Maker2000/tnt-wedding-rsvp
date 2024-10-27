import { FormEvent, useState } from "react";

export const useLoginHook = () => {
  const [dto, setDto] = useState<LoginDto>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const canLogin = () => {
    return dto.email.length > 0 && dto.password.length > 0;
  };
  return { dto, login, canLogin, setEmail, setPassword, toggleShowPassword, showPassword };
};
