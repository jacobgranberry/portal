import React from "react";
import electron from "electron";
import { useAuth } from "../utils/auth/auth";
import { useRouter } from "next/router";
import { NonAuthRoutes } from "./authRoute";
import { getSession } from "next-auth/client";

const ipcRenderer: any = electron.ipcRenderer || false;

export const DevTools = () => {
  const auth = useAuth();
  const router = useRouter();

  const getSettings = async () => {
    console.log(await ipcRenderer.invoke("get-all-settings"));
  };

  const getSessiona = async () => {
    const session = await getSession();
    console.log(session);
  };

  const clearSettings = async () => {
    await ipcRenderer.invoke("clear-all-settings");
    console.log(
      "sttings cleared: ",
      await ipcRenderer.invoke("get-all-settings")
    );
  };

  const goToLogin = () => {
    router.push(NonAuthRoutes.login);
  };

  return (
    <div className="bg-gray-900 absolute bottom-0 left-52 p-4 z-50">
      {/* <DarkModeToggle /> */}
      <button className="border-2 p-1" onClick={goToLogin}>
        gotologin
      </button>
      {/* <button className="border-2 p-1" onClick={clearSettings}>
        Clear
      </button> */}
      <button className="border-2 p-1" onClick={getSettings}>
        Get Config
      </button>
      <button className="border-2 p-1" onClick={getSessiona}>
        Get Session
      </button>
      {/*
      <button className="border-2 p-1" onClick={refreshToken}>
        Refresh Token
      </button> */}
      {/* <button className="border-2 p-1" onClick={signout}>
        signout
      </button> */}
    </div>
  );
};
