/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import { Header } from "./header";
import { SettingsPanel } from "./settingsPanel";

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);

  return (
    <div
    // x-data="setup()"
    // x-init="$refs.loading.classList.add('hidden');"
    // :class="{ 'dark': isDark}"
    >
      <div className="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-gray-500 dark:text-gray-50">
        {/* <!-- Loading screen --> */}
        {/* <div
        x-ref="loading"
        class="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white bg-opacity-90 bg-blue-800"
      >
        Loading.....
      </div> */}

        {/* <!-- Sidebar --> */}
        <aside className="flex-shrink-0 hidden w-64 bg-white border-r dark:border-blue-800 dark:bg-gray-800 md:block">
          <div className="flex flex-col h-full">
            {/* <!-- Sidebar links --> */}
            <nav
              aria-label="Main"
              className="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto"
            >
              {/* <!-- Dashboards links --> */}
              <div x-data="{ isActive: false, open: false}">
                {/* <!-- active & hover classes 'bg-blue-100 dark:bg-blue-600' --> */}
                <a
                  href="#"
                  // @click="$event.preventDefault(); open = !open"
                  className="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-blue-100 dark:hover:bg-blue-600"
                  // :class="{'bg-blue-100 dark:bg-blue-600': isActive || open}"
                  role="button"
                  aria-haspopup="true"
                  // :aria-expanded="(open || isActive) ? 'true' : 'false'"
                >
                  <span aria-hidden="true">
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </span>
                  <span className="ml-2 text-sm">Servers</span>
                  <span className="ml-auto" aria-hidden="true">
                    {/* <!-- active class 'rotate-180' --> */}
                    <svg
                      className="w-4 h-4 transition-transform transform"
                      // :class="{ 'rotate-180': open }"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </a>
                <div
                  role="menu"
                  x-show="open"
                  className="mt-2 space-y-2 px-7"
                  aria-label="Dashboards"
                >
                  {/* <!-- active & hover classes 'text-gray-700 dark:text-light' -->
                <!-- inActive classes 'text-gray-400 dark:text-gray-400' --> */}
                  <a
                    href="#"
                    role="menuitem"
                    className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:text-gray-400 dark:hover:text-light hover:text-gray-700"
                  >
                    Default
                  </a>
                  <a
                    href="#"
                    role="menuitem"
                    className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                  >
                    Project Mangement
                  </a>
                  <a
                    href="#"
                    role="menuitem"
                    className="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                  >
                    E-Commerce
                  </a>
                </div>
              </div>
            </nav>

            {/* <!-- Sidebar footer --> */}
            <div className="flex-shrink-0 px-2 py-4 space-y-2">
              <button
                onClick={() => {
                  setSettingsPanelOpen(!settingsPanelOpen);
                }}
                type="button"
                className="flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-700 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
              >
                <span aria-hidden="true">
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </span>
                <span>Customize</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex flex-col flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
          <Header
            settingsPanelOpen={settingsPanelOpen}
            setSettingsPanelOpen={setSettingsPanelOpen}
          />

          {/* <!-- Main content --> */}
          <div className="flex items-center justify-center flex-1 h-full p-4 dark:bg-gray-700">
            <main className="space-y-4">
              <p className="text-base font-medium">content</p>
            </main>
          </div>
        </div>

        <SettingsPanel
          settingsPanelOpen={settingsPanelOpen}
          setSettingsPanelOpen={setSettingsPanelOpen}
        />

        {/* <NotificationPanel
          setNotificationsPanelOpen={setNotificationsPanelOpen}
          notificationsPanelOpen={notificationsPanelOpen}
        /> */}

        {/* <SearchPanel setSearchPanelOpen={setSearchPanelOpen} searchPanelOpen={searchPanelOpen} /> */}
      </div>
    </div>
  );
};
