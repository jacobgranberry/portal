import React, { useState } from 'react';
import { useAuth } from '../../utils/auth/auth';
import { useRouter } from 'next/router';
import { NonAuthRoutes } from '../authRoute';

export const AvatarMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const signout = async () => {
    await auth.signout();
    router.push(NonAuthRoutes.login);
  };

  return (
    <>
      <div className="relative" x-data="{ open: false }">
        <button
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
          type="button"
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : 'false'}
          className="transition-opacity duration-200 rounded-full dark:opacity-75 dark:hover:opacity-100 focus:outline-none focus:ring dark:focus:opacity-100"
        >
          <span className="sr-only">User menu</span>
          {auth.user && (
            <img
              className="w-10 h-10 rounded-full"
              src={`https://crafatar.com/avatars/${auth?.user?.selectedProfile?.id}`}
              alt={auth.user.selectedProfile.name}
            />
          )}
        </button>

        {/* <!-- User dropdown menu --> */}
        <div
          // x-transition:enter="transition-all transform ease-out"
          // x-transition:enter-start="translate-y-1/2 opacity-0"
          // x-transition:enter-end="translate-y-0 opacity-100"
          // x-transition:leave="transition-all transform ease-in"
          // x-transition:leave-start="translate-y-0 opacity-100"
          // x-transition:leave-end="translate-y-1/2 opacity-0"
          // @click.away="open = false"
          // @keydown.escape="open = false"
          className={`${
            openMenu ? 'block' : 'hidden'
          } absolute right-0 w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 dark:bg-dark focus:outline-none`}
          tabIndex={-1}
          role="menu"
          aria-orientation="vertical"
          aria-label="User menu"
        >
          <a
            href="#"
            role="menuitem"
            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600"
          >
            Your Profile
          </a>
          <a
            href="#"
            role="menuitem"
            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600"
          >
            Settings
          </a>
          <a
            onClick={signout}
            role="menuitem"
            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600"
          >
            Logout
          </a>
        </div>
      </div>
    </>
  );
};
