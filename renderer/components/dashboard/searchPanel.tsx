import React from 'react';

export const SearchPanel = ({ setSearchPanelOpen, searchPanelOpen }: any) => {
  return (
    <>
      {/* <!-- Search panel -->
      <!-- Backdrop --> */}
      <div
        // x-transition:enter="transition duration-300 ease-in-out"
        // x-transition:enter-start="opacity-0"
        // x-transition:enter-end="opacity-100"
        // x-transition:leave="transition duration-300 ease-in-out"
        // x-transition:leave-start="opacity-100"
        // x-transition:leave-end="opacity-0"
        // x-show="isSearchPanelOpen"
        // @click="isSearchPanelOpen = false"
        onClick={() => {
          setSearchPanelOpen(!searchPanelOpen);
        }}
        className={`${
          searchPanelOpen ? 'block' : 'hidden'
        } fixed inset-0 z-10 bg-blue-800 bg-opacity-25`}
        // style="opacity: .5;"
        // aria-hidden="ture"
      ></div>
      {/* <!-- Panel --> */}
      <section
        x-cloak
        // x-transition:enter="transition duration-300 ease-in-out transform sm:duration-500"
        // x-transition:enter-start="-translate-x-full"
        // x-transition:enter-end="translate-x-0"
        // x-transition:leave="transition duration-300 ease-in-out transform sm:duration-500"
        // x-transition:leave-start="translate-x-0"
        // x-transition:leave-end="-translate-x-full"
        x-show="isSearchPanelOpen"
        // @keydown.escape="isSearchPanelOpen = false"
        className={`${
          searchPanelOpen ? 'block' : 'hidden'
        } fixed inset-y-0 z-20 w-full max-w-xs bg-white shadow-xl dark:bg-darker dark:text-light sm:max-w-md focus:outline-none`}
      >
        <div className="absolute right-0 p-2 transform translate-x-full">
          {/* <!-- Close button --> */}
          <button
            // @click="isSearchPanelOpen = false"
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

        <h2 className="sr-only">Search panel</h2>
        {/* <!-- Panel content --> */}
        <div className="flex flex-col h-screen">
          {/* <!-- Panel header (Search input) --> */}
          <div className="relative flex-shrink-0 px-4 py-8 text-gray-400 border-b dark:border-blue-800 dark:focus-within:text-light focus-within:text-gray-700">
            <span className="absolute inset-y-0 inline-flex items-center px-4">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              x-ref="searchInput"
              type="text"
              className="w-full py-2 pl-10 pr-4 border rounded-full dark:bg-dark dark:border-transparent dark:text-light focus:outline-none focus:ring"
              placeholder="Search..."
            />
          </div>

          {/* <!-- Panel content (Search result) --> */}
          <div className="flex-1 px-4 pb-4 space-y-4 overflow-y-hidden font-sans h hover:overflow-y-auto">
            <h3 className="py-2 text-sm font-semibold text-gray-600 dark:text-light">History</h3>
            <a href="#" className="flex space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-lg"
                  src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                  alt="Post cover"
                />
              </div>
              <div className="flex-1 max-w-xs overflow-hidden">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-light">Header</h4>
                <p className="text-sm font-normal text-gray-400 truncate dark:text-blue-400">
                  Lorem ipsum dolor, sit amet consectetur.
                </p>
                <span className="text-sm font-normal text-gray-400 dark:text-blue-500"> Post </span>
              </div>
            </a>
            <a href="#" className="flex space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-lg"
                  src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                  alt="Ahmed Kamel"
                />
              </div>
              <div className="flex-1 max-w-xs overflow-hidden">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-light">Ahmed Kamel</h4>
                <p className="text-sm font-normal text-gray-400 truncate dark:text-blue-400">
                  Last activity 3h ago.
                </p>
                <span className="text-sm font-normal text-gray-400 dark:text-blue-500">
                  {' '}
                  Offline{' '}
                </span>
              </div>
            </a>
            <a href="#" className="flex space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-lg"
                  src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                  alt="K-WD Dashboard"
                />
              </div>
              <div className="flex-1 max-w-xs overflow-hidden">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-light">
                  K-WD Dashboard
                </h4>
                <p className="text-sm font-normal text-gray-400 truncate dark:text-blue-400">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </p>
                <span className="text-sm font-normal text-gray-400 dark:text-blue-500">
                  {' '}
                  Updated 3h ago.{' '}
                </span>
              </div>
            </a>
            <template x-for="i in 10" x-key="i">
              <a href="#" className="flex space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-lg"
                    src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                    alt="K-WD Dashboard"
                  />
                </div>
                <div className="flex-1 max-w-xs overflow-hidden">
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-light">
                    K-WD Dashboard
                  </h4>
                  <p className="text-sm font-normal text-gray-400 truncate dark:text-blue-400">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                  <span className="text-sm font-normal text-gray-400 dark:text-blue-500">
                    {' '}
                    Updated 3h ago.{' '}
                  </span>
                </div>
              </a>
            </template>
          </div>
        </div>
      </section>
    </>
  );
};
