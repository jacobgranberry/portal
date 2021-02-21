import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../utils/auth/auth";
import { Button } from "./button";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Icon } from "./icon";
import { useRouter } from "next/router";
import { AuthRoutes } from "./authRoute";
import { signIn, signOut, useSession } from "next-auth/client";

interface FormData {
  login: string;
  password: string;
  remember?: boolean;
}

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm<FormData>({
    defaultValues: {
      login: "jacobgranbry@gmail.com",
      password: "Granberrica11!",
      remember: true,
    },
  });
  const auth = useAuth();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    signIn("mojang-login", {
      username: data.login,
      password: data.password,
    });

    // try {
    //   setLoading(true);
    //   const user = await auth?.signin(data.login, data.password);
    //   if (user) {
    //     setLoading(false);
    //     router.push(AuthRoutes.dashboard);
    //   } else {
    //     setLoading(false);
    //   }
    // } catch (err) {
    //   setLoading(false);
    //   console.error(err);
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
      <Input
        name="login"
        label="Login"
        ref={register({ required: true })}
        error={errors.login && "Login required"}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        ref={register({ required: true })}
        error={errors.password && "Password required"}
        helperText={
          <a
            href="https://www.minecraft.net/en-us/password/forgot/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-green-800 dark:text-green-700 hover:text-gray-800 font-medium"
          >
            Forgot Password?
          </a>
        }
      />
      <Checkbox name="remember" ref={register} label="Remember me" />
      <div>
        <Button variant="primary" loading={loading}>
          Log in
        </Button>
      </div>
      <div className="flex flex-col space-y-5">
        <span className="flex items-center justify-center space-x-2">
          <span className="h-px bg-gray-400 w-14" />
          <span className="font-normal text-gray-500 dark:text-gray-300">
            or login with
          </span>
          <span className="h-px bg-gray-400 w-14" />
        </span>
        <div className="flex flex-col space-y-4">
          <Button variant="outline">
            <Icon name="microsoft" iconProps="w-4 mr-2" />
            <span>Microsoft</span>
          </Button>
        </div>
      </div>
    </form>
  );
};
