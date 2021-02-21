/* eslint-disable consistent-return */
import React, { FC, useContext, createContext } from "react";
import { toast } from "react-toastify";
import { invalidateMojangToken } from "../../services/mojang";
import { signIn, signOut } from "next-auth/client";

interface AuthContextInterface {
  signin: (email: string, password: string) => Promise<boolean>;
  signout: (accessToken?: string, clientToken?: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const signin = async (login: string, password: string) => {
    try {
      const res: any = await signIn("mojang-login", {
        username: login,
        password: password,
        redirect: false,
      });
      if (!res.ok && res.status === 403) {
        toast.error(
          "Invalid credentials. Please check your username and password and try again.",
          {
            className: "bg-red-800 text-sm",
          }
        );
      } else {
        if (res.ok && res.status === 200) {
          return true;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signout = async (accessToken?: string, clientToken?: string) => {
    try {
      // @ts-ignore
      await signOut({ callbackUrl: "/", redirect: false });
      await invalidateMojangToken(accessToken, clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    signin,
    signout,
  };
}

// Context Provider component that wraps your app and makes auth object
// available to any child component that calls the useAuth() hook.
export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
