"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { CookieKey } from "../models/enums";
import { DisplayUser } from "../models/user";
import { HttpClient } from "@/lib/http-client";

interface AuthState {
  user?: DisplayUser | null;
}
type AuthContextProviderProps = {
  children: ReactNode;
};
type AuthContext = {
  authState: AuthState;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
  setUser: (user?: DisplayUser | null) => void;
};

export const AuthContext = createContext<AuthContext | null>(null);
const initialiseUser = (): AuthState => {
  const user = localStorage.getItem(CookieKey.adminUser);
  return user != null ? { user: new DisplayUser(JSON.parse(user)) } : {};
};
export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({});
  useEffect(() => {
    let cachedUser = initialiseUser();
    setAuthState(cachedUser);
    if (cachedUser?.user) {
      HttpClient.getData<DisplayUser>(`/api/admin/${cachedUser.user!.id}`).then((data) => {
        if (data.data) {
          console.log(data.data);
          setUser(new DisplayUser(data.data!));
        }
      });
    }
  }, []);
  useEffect(() => {
    if (authState.user) {
      localStorage.setItem(CookieKey.adminUser, JSON.stringify(authState.user));
    } else {
      localStorage.removeItem(CookieKey.adminUser);
    }
  }, [authState.user]);
  const setUser = (user?: DisplayUser | null) => {
    setAuthState({
      ...authState,
      user: user,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext(): AuthContext {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
}
