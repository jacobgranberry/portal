import React, { useState } from "react";
import { AuthRoutes } from "../components/authRoute";
import { Layout } from "../components/layout";
import { useAuth } from "../utils/auth/auth";
import { useSession, getSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Checkbox } from "../components/checkbox";
import { Icon } from "../components/icon";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface FormData {
  login: string;
  password: string;
  remember?: boolean;
}

const Login = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [session, loading] = useSession();
  const router = useRouter();
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm<FormData>({
    defaultValues: {
      login: "jacobgranbry@gmail.com",
      password: "Granberrica11!",
      remember: true,
    },
  });

  // route to dashboard
  // if validated
  if (loading) return null;
  if (session) {
    router.push(AuthRoutes.dashboard);
  }

  const onSubmit = async (data: FormData) => {
    try {
      setButtonLoading(true);
      const res = await auth.signin(data.login, data.password);
      if (res) {
        router.push(AuthRoutes.dashboard);
      }
      setButtonLoading(false);
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(
        "Error logging into Mojang servers. Please try again later.",
        {
          className: "bg-red-800 text-sm z-50",
        }
      );
      setButtonLoading(false);
    }
  };

  return (
    <Layout>
      <div className="relative flex items-center p-4 lg:justify-center w-full h-full z-30">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md border-4 border-gray-800 dark:border-gray-700">
          <div className="p-4 py-6 text-white bg-red-700 dark:bg-red-800 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly border-r-4 border-gray-800 dark:border-gray-700">
            <div className="my-3 text-4xl font-bold tracking-wider text-center w-3/4">
              <a
                href="https://www.westeroscraft.com"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 593.39 81.56"
                  style={{
                    fill: "white",
                  }}
                >
                  <g id="Layer_2">
                    <g id="Layer_1-2">
                      <path d="M9.83 31.17C5.65 17.64 4 12.81 0 12.46v-1.32c3.6 0 6.6.61 9.1.61s6.9-.61 10.49-.61v1.32c-3.67 0-5.06 1.66-5.06 5.09 0 2.9 1 7.12 2.5 12.48l9.39 34.09 9.54-32c-4-12.74-6.09-19.07-8.81-19.68v-1.3c3.67 0 6.46.61 9 .61s5.87-.61 9.46-.61v1.32c-4.18.17-5.43 2.81-5.43 6.06 0 3 1.25 7.29 2.06 10.1L52 64.12l9.1-32.42a40.76 40.76 0 001.61-10.2c0-4.39-1.25-8.25-5.21-9v-1.36c3.67 0 6.24.61 8.81.61s4-.61 7.63-.61v1.32c-3.6.26-6.31 5.35-9.17 15.11L50.49 76.06h-1.17L37.06 35.91 25 76.06h-1.22zM72.84 68.31C77.21 68.17 79 67 79 44.27V40c0-20-1.91-20.44-5.43-20.65v-1.02c3.74 0 5.85.49 8.46.49 3.24 0 10.29-.28 20.8-.28 2.75 0 2.75-1.83 2.75-1.83h1c0 7.19.5 15.22.5 15.22l-1 .22c-2.47-7.41-4.94-11.85-12.41-11.85-1.48 0-7.54.14-7.54.14s-1.34 5-1.41 20.17h6.58c6.84 0 8.39-4.16 9.73-7.62l1 .28s-.56 5.22-.56 8.11a79.11 79.11 0 001.12 9.23l-.91.29c-1.06-3.18-2.61-8.6-11.21-8.6h-5.79c0 20.23 1.32 24.6 1.32 24.6s4.65.56 7.47.56c7.4 0 10.93-5.71 14.87-16l1 .35a98.43 98.43 0 00-1.76 16.92c-3.6.36-7.12.5-10.43.5-5.71 0-12.06-.36-15.16-.36-2.61 0-5.43.5-9.16.5zM112.87 63c0-5.71 4.23-9.44 9.94-9.44l.42.7a11.11 11.11 0 00-3.8 8.67c0 5.64 3.66 11.35 11.06 11.35 8.11 0 10.93-5.57 10.93-11.21 0-16.21-25.16-17.62-25.16-33.2 0-6 5.07-12.13 14.73-12.13 4.44 0 6.7 1.13 9.8 1.13a2.93 2.93 0 003.1-2.18l1.13.21a91.09 91.09 0 00-1.27 16.1l-1.13.14c-2.26-8.74-4.72-13.74-11.42-13.74-5.22 0-8.74 3.45-8.74 8 0 12.48 25.45 16.36 25.45 33.56 0 7.33-6.28 15.08-17.63 15.08-9.44.02-17.41-4.56-17.41-13.04zM163 68.31c5.07-.14 7.54-1.34 7.54-22.63v-25.8c-10.57 1.2-15.08 4.93-15.08 11.63a10.68 10.68 0 003.54 8.32l-.42.7a9 9 0 01-9.24-9.16c0-8 8.18-12.2 23.55-13.54 10.57-.91 23.61-2 29-17.83h.85a5.43 5.43 0 012.32 4.72c0 9-11.77 13.47-28.48 14.74v26.22c0 21.29 2.33 22.21 7.55 22.63v1.06c-3.74 0-8-.5-10.58-.5s-6.83.5-10.57.5z" />
                      <path d="M193.44 68.31c4.37-.14 6.13-1.34 6.13-24V40c0-20-1.9-20.44-5.43-20.65v-1.02c3.74 0 5.85.49 8.46.49 3.25 0 10.3-.28 20.8-.28 2.75 0 2.75-1.83 2.75-1.83h1c0 7.19.49 15.22.49 15.22l-1 .22c-2.47-7.41-4.93-11.85-12.41-11.85-1.48 0-7.54.14-7.54.14s-1.34 5-1.41 20.17h6.63c6.84 0 8.39-4.16 9.73-7.62l1 .28s-.56 5.22-.56 8.11a79 79 0 001.13 9.23l-.92.29c-1.06-3.18-2.61-8.6-11.21-8.6h-5.78c0 20.23 1.34 24.6 1.34 24.6s4.65.56 7.47.56c7.41 0 10.93-5.71 14.88-16l1 .35a98.43 98.43 0 00-1.76 16.92c-3.59.36-7.12.5-10.43.5-5.71 0-12.06-.36-15.16-.36-2.61 0-5.43.5-9.16.5zM254.77 46.39h-.64a57.77 57.77 0 01-7.33-.57v4.87c0 12.68 1.41 17.2 8.18 17.62v1.06c-2.82 0-6.77-.5-10.65-.5-2.61 0-5.71.5-9.44.5v-1.06c4.37-.14 6.13-1.34 6.13-24V40c0-20-1.91-20.44-5.43-20.65v-1.02c3.74 0 5.85.49 8.46.49 4.65 0 8.88-.21 13.32-.21 8.6 0 14.24 3.6 14.24 11.84 0 8-5.92 13.12-12.05 15C278.87 78.88 285.85 79 292.34 79v1.06c-3.6.64-6.28 1.48-10.08 1.48-5.43.02-11.49-.12-27.49-35.15zm9.93-15.09c0-7.54-3.38-11.14-10.15-11.14-1.05 0-5.28.07-6.48.28a148.22 148.22 0 00-1.27 21.43v1.77a23.2 23.2 0 007.2 1.19c5.14 0 10.7-3.83 10.7-13.53z" />
                      <path d="M278 43.78a30.51 30.51 0 012.89-13.89h.92a14.49 14.49 0 003.54 8.11l.22.84a34.69 34.69 0 00-.29 5.64c0 14.52 6.35 24 17.35 24 8.81 0 16.21-7.68 16.21-26 0-16-6.63-23.48-15.72-23.48a11.08 11.08 0 00-11.56 11.35 11.33 11.33 0 003.59 8.39l-.42.71a9 9 0 01-9.23-9.17c0-8.46 8-13 17.41-13 13.39 0 23.54 9 23.54 25.94 0 17.13-9.65 27.21-23.82 27.21C287.82 70.42 278 61.4 278 43.78zM330 63c0-5.71 4.23-9.44 9.94-9.44l.42.7a11.11 11.11 0 00-3.8 8.67c0 5.64 3.66 11.35 11.07 11.35 8.1 0 10.92-5.57 10.92-11.21 0-16.21-25.16-17.62-25.16-33.2 0-6 5.07-12.13 14.73-12.13 4.44 0 6.7 1.13 9.8 1.13a2.93 2.93 0 003.1-2.18l1.13.21a91.09 91.09 0 00-1.3 16.1l-1.13.14C357.46 24.4 355 19.4 348.3 19.4c-5.22 0-8.74 3.45-8.74 8C339.56 39.9 365 43.78 365 61c0 7.33-6.28 15.08-17.63 15.08C337.94 76.06 330 71.48 330 63zM370.29 44.05c0-21.51 11.7-31.84 25.89-31.84 6.92 0 10 2 13.54 2a2.68 2.68 0 002.79-2.71h1.11s-.08 3.22-.08 6.61c0 7.88.45 14 .45 14l-1.18.26c-3.31-10.37-7.65-18.29-16.55-18.29-12.88 0-17.95 12.44-17.95 29.13 0 21.34 9.34 30.91 18.9 30.91 8.46 0 11.63-5.34 16.26-19.57l1.1.34A106.13 106.13 0 00413 73.18c-1.92.94-7.36 2.88-16.85 2.88-15.78 0-25.86-11.94-25.86-32.01zM439.3 46.39h-.63a57.78 57.78 0 01-7.34-.57v4.87c0 12.68 1.41 17.2 8.18 17.62v1.06c-2.82 0-6.77-.5-10.64-.5-2.61 0-5.71.5-9.45.5v-1.06c4.37-.14 6.13-1.34 6.13-24V40c0-20-1.9-20.44-5.43-20.65v-1.02c3.74 0 5.86.49 8.46.49 4.66 0 8.89-.21 13.33-.21 8.6 0 14.24 3.6 14.24 11.84 0 8-5.92 13.12-12.06 15C463.41 78.88 470.39 79 476.87 79v1.06c-3.59.64-6.27 1.48-10.08 1.48-5.43.02-11.49-.12-27.49-35.15zm9.94-15.09c0-7.54-3.38-11.14-10.15-11.14-1.06 0-5.29.07-6.49.28a148.22 148.22 0 00-1.27 21.43v1.77a23.28 23.28 0 007.19 1.19c5.15 0 10.72-3.83 10.72-13.53z" />
                      <path d="M460.87 68.31c3.59-.21 5.21-3.74 8.74-12.13l10.71-25.59a12.14 12.14 0 001-4.86c0-3.74-2-6.84-5.78-6.84-4.8 0-7.83 3.88-7.83 8.32a11.34 11.34 0 003.88 8.32l-.35.56c-5.92 0-8.81-3.66-8.81-7.75 0-5.08 4.44-10.86 13-10.86 3.17 0 6.34.92 8.74.92a6 6 0 002-.28l.5.28 12.12 34.89c3.32 9.59 5.15 14.6 9.66 15v1.06c-3.74 0-6.56-.5-9.16-.5s-5.86.5-9.59.5v-1.04c2.75-.07 4.3-1.34 4.3-4.72a32 32 0 00-1.62-8.25l-1.34-4.51h-15.72a1.3 1.3 0 00-1.34.77c-2.26 5.92-3.32 9.31-3.46 12v.21c0 2.54 1.06 4.09 4 4.51v1.06c-3.17 0-4.58-.5-7.19-.5s-3.81.5-6.48.5zm29.53-19.53L484 27.42l-8.81 21.36c-.15.35.14.43.35.43 1.05 0 7.6-.36 14.86-.43zM510.28 68.31c4.37-.14 6.13-1.34 6.13-24V40c0-20-1.9-20.44-5.43-20.65v-1.02c3.74 0 5.85.49 8.46.49 3.24 0 11-.28 21.5-.28 2.75 0 2.75-1.83 2.75-1.83h1c0 7.19.49 15.22.49 15.22l-1 .22c-2.47-7.41-4.94-11.85-12.41-11.85-1.48 0-8 .14-8.25.14 0 0-1.06 4.37-1.34 20.17h7c6.84 0 8.6-3.46 9.94-6.91l1 .28s-.57 4.51-.57 7.4c0 2.61 1.2 10.72 1.48 12.62l-1.05.14c-1.34-5.36-2.89-11.84-11.64-11.84h-6.2v4.86c0 19.39 2.54 20.37 8.18 21.15v1.06c-3.74 0-8.32-.5-10.93-.5s-5.43.5-9.16.5zM560.25 68.31c5.08-.14 7.55-1.34 7.55-22.63V20.94h-6c-6.06 0-9.51 1.69-12 9.09l-1.13-.21s.5-5.92.5-13.11h1s0 1.83 2.75 1.83c8 0 15.37.28 18.19.28s11.14-.28 18.12-.28c2.75 0 3-1.83 3-1.83l1.13.21a126 126 0 00-1.34 13.6l-1.13.22c-1.91-7.2-4.44-9.8-10.58-9.8h-6.48v24.74c0 21.29 2.32 22.21 7.54 22.63v1.06c-3.74 0-8-.5-10.57-.5s-6.84.5-10.58.5z" />
                    </g>
                  </g>
                </svg>
              </a>
            </div>
            <p className="mt-6 font-normal font-sans text-center text-gray-200 md:mt-0">
              You must own the Java edition of Minecraft and have a valid Mojang
              or Microsoft account to log in. We do not ever store your password
              or any other personal information.
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Don't have an account?</span>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.minecraft.net/en-us/store/minecraft-java-edition"
                className="underline"
              >
                Buy Minecraft: Java Edition!
              </a>
            </p>
            <p className="mt-6 text-sm text-center text-gray-200">
              View our{" "}
              <a href="/" className="underline">
                launcher source code
              </a>
            </p>
          </div>
          <div className="p-5 bg-white dark:bg-gray-800 md:flex-1">
            <h3 className="my-4 text-2xl font-heading font-semibold text-gray-700 dark:text-white">
              Minecraft Account Login
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-5"
            >
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
                <Button variant="primary" loading={buttonLoading}>
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
            <div>
              <p className="mt-6 text-sm text-center text-gray-400">
                Having issues logging in? Check out our{" "}
                <a
                  href="https://forum.westeroscraft.com/forum/support.40/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-800 dark:text-green-700 hover:text-gray-800 font-medium"
                >
                  support forum
                </a>{" "}
                or browse the #tech-support channel in our
                <a
                  href="https://discord.gg/pBS5TH4"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-800 dark:text-green-700 hover:text-gray-800 font-medium"
                >
                  {" "}
                  Discord.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

export default Login;
