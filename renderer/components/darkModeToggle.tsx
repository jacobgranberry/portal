import React from 'react';
import useDarkMode from 'use-dark-mode';

export const DarkModeToggle = () => {
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
  });

  return (
    <button
      aria-hidden="true"
      className="relative focus:outline-none"
      // x-cloak
      onClick={darkMode.toggle}
    >
      <div className="w-12 h-6 transition bg-blue-100 rounded-full outline-none dark:bg-blue-400"></div>
      <div
        className="absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-150 transform scale-110 rounded-full shadow-sm"
        // :class="{ 'translate-x-0 -translate-y-px  bg-white text-blue-700': !isDark, 'translate-x-6 text-blue-100 bg-blue-800': isDark }"
      >
        {/* <div className={darkMode.value ? 'hidden' : 'block'}> */}
        <svg
          className="w-4 h-4"
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
        {/* </div>
        <div className={darkMode.value ? 'block' : 'hidden'}> */}
        <svg
          className="w-4 h-4"
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
      </div>
      {/* </div> */}
    </button>
  );
};
