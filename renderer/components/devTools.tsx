import React from "react";
import electron from "electron";
import { useRouter } from "next/router";
import { NonAuthRoutes } from "./authRoute";
import { getSession } from "next-auth/client";

const ipcRenderer: any = electron.ipcRenderer || false;

export const DevTools = () => {
  const router = useRouter();

  const getSettings = async () => {
    console.log(await ipcRenderer.invoke("get-all-settings"));
  };

  const getSessiona = async () => {
    const session = await getSession();
    console.log(session);
  };

  const goToLogin = () => {
    router.push(NonAuthRoutes.login);
  };

  return (
    <div className="bg-gray-900 absolute bottom-0 left-52 p-4 z-50">
      <button className="border-2 p-1" onClick={goToLogin}>
        gotologin
      </button>
      <button className="border-2 p-1" onClick={getSettings}>
        Get Config
      </button>
      <button className="border-2 p-1" onClick={getSessiona}>
        Get Session
      </button>
    </div>
  );
};
