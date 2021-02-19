import React from 'react';

export const SettingsPanel = ({ setSettingsPanelOpen, settingsPanelOpen }: any) => {
  return (
    <>
      <div
        // x-transition:enter="transition duration-300 ease-in-out"
        // x-transition:enter-start="opacity-0"
        // x-transition:enter-end="opacity-100"
        // x-transition:leave="transition duration-300 ease-in-out"
        // x-transition:leave-start="opacity-100"
        // x-transition:leave-end="opacity-0"
        onClick={() => {
          setSettingsPanelOpen(!settingsPanelOpen);
        }}
        className={`fixed inset-0 z-10 bg-blue-800 opacity-50 ${
          settingsPanelOpen ? 'block' : 'hidden'
        }`}
        aria-hidden="true"
      ></div>
      {/* <!-- Panel --> */}
      <section
        // x-transition:enter="transition duration-300 ease-in-out transform sm:duration-500"
        // x-transition:enter-start="translate-x-full"
        // x-transition:enter-end="translate-x-0"
        // x-transition:leave="transition duration-300 ease-in-out transform sm:duration-500"
        // x-transition:leave-start="translate-x-0"
        // x-transition:leave-end="translate-x-full"
        x-ref="settingsPanel"
        tabIndex={-1}
        x-show="isSettingsPanelOpen"
        className={`${
          settingsPanelOpen ? 'block' : 'hidden'
        } fixed inset-y-0 right-0 z-20 w-full max-w-xs bg-white shadow-xl dark:bg-darker dark:text-light sm:max-w-md focus:outline-none`}
        aria-labelledby="settinsPanelLabel"
      >
        <div className="absolute left-0 p-2 transform -translate-x-full">
          {/* <!-- Close button --> */}
          <button
            onClick={() => {
              setSettingsPanelOpen(false);
            }}
            className="p-2 text-white rounded-md focus:outline-none focus:ring"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* <!-- Panel content --> */}
        <div className="flex flex-col h-screen">
          {/* <!-- Panel header --> */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 px-4 py-8 space-y-4 border-b dark:border-blue-700">
            <span aria-hidden="true" className="text-gray-500 dark:text-blue-600">
              <svg
                className="w-8 h-8"
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
            <h2
              id="settingsPanelLabel"
              className="text-xl font-medium text-gray-500 dark:text-light"
            >
              Settings
            </h2>
          </div>
          {/* <!-- Content --> */}
          <div className="flex-1 overflow-hidden hover:overflow-y-auto">
            {/* <!-- Theme --> */}
            <div className="p-4 space-y-4 md:p-8">
              <h6 className="text-lg font-medium text-gray-400 dark:text-light">Mode</h6>
              <div className="flex items-center space-x-8">
                {/* <!-- Light button --> */}
                <button
                  // @click="setLightTheme"
                  className="flex items-center justify-center px-4 py-2 space-x-4 transition-colors border rounded-md hover:text-gray-900 hover:border-gray-900 dark:border-blue-700 dark:hover:text-blue-100 dark:hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-indigo-700"
                  // :class="{ 'border-gray-900 text-gray-900 dark:border-blue-500 dark:text-blue-100': !isDark, 'text-gray-500 dark:text-blue-500': isDark }"
                >
                  <span>
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </span>
                  <span>Light</span>
                </button>

                {/* <!-- Dark button --> */}
                <button
                  // @click="setDarkTheme"
                  className="flex items-center justify-center px-4 py-2 space-x-4 transition-colors border rounded-md hover:text-gray-900 hover:border-gray-900 dark:border-blue-700 dark:hover:text-indigo-100 dark:hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-700"
                  // :class="{ 'border-gray-900 text-gray-900 dark:border-blue-500 dark:text-blue-100': isDark, 'text-gray-500 dark:text-blue-500': !isDark }"
                >
                  <span>
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </span>
                  <span>Dark</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
