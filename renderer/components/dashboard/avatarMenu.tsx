import React, { useState } from "react";
import { useAuth } from "../../utils/auth/auth";
import { useRouter } from "next/router";
import { NonAuthRoutes } from "../authRoute";

export const AvatarMenu = ({ session }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const signout = async () => {
    await auth.signout(session.accessToken, session.clientToken);
    router.push(NonAuthRoutes.login);
  };

  return (
    <div x-data="{ dropdownOpen: false }" className="relative">
      <button
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
        className="flex items-center space-x-2 relative focus:outline-none"
      >
        {session?.user && (
          <>
            <h2 className="text-gray-700 dark:text-gray-300 text-sm hidden sm:block">
              {session.name}
            </h2>
            <img
              className="h-9 w-9 rounded-full border-2 border-purple-500 object-cover"
              src={`https://crafatar.com/avatars/${session.userId}`}
              alt={session.name}
            />
          </>
        )}
      </button>

      <div
        className={`${
          dropdownOpen ? "block" : "hidden"
        } absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10`}
        // x-show="dropdownOpen"
        // x-transition:enter="transition ease-out duration-100 transform"
        //           x-transition:enter-start="opacity-0 scale-95" x-transition:enter-end="opacity-100 scale-100"
        //           x-transition:leave="transition ease-in duration-75 transform"
        //           x-transition:leave-start="opacity-100 scale-100" x-transition:leave-end="opacity-0 scale-95"
        // @click.away="dropdownOpen = false"
      >
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-600 hover:text-white"
        >
          Profile
        </a>
        <a
          onClick={signout}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-600 hover:text-white"
        >
          Logout
        </a>
      </div>
    </div>
  );
};
