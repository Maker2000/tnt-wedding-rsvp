"use client";
import React, { useEffect, useState } from "react";
import { useRegisterHook } from "./register.hook";

function Register() {
  const [state, setState] = useState({ isLoading: false, errorMessage: "" });
  const hook = useRegisterHook();
  useEffect(() => {
    hook.validateToken().then((x) => {
      setState(
        (value) =>
          (value = {
            ...value,
            isLoading: false,
            errorMessage: x,
          })
      );
    });
  }, []);
  return (
    <div>
      <div>Valiating...</div>
      <div>{state.errorMessage}</div>
    </div>
  );
}

export default Register;
