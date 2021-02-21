import React, { ReactNode } from "react";

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-gray-800"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);
interface ButtonInterface {
  loading?: boolean;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "outline";
}

const primaryStyles =
  "bg-yellow-300 dark:bg-yellow-400 hover:bg-yellow-400 dark:hover:bg-yellow-500 border-b-4 dark:border-yellow-500";
const outlineStyles =
  "bg-white dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-600 dark:border-gray-600 text-gray-800 dark:text-gray-50 hover:text-white";

export const Button = ({
  children,
  type = undefined,
  loading,
  variant,
}: ButtonInterface) => {
  return (
    <button
      type={type}
      style={{ minHeight: 45 }}
      disabled={loading}
      className={`${
        variant === "primary" ? primaryStyles : outlineStyles
      } flex items-center justify-center border-gray-800 border w-full px-4 py-2 text-base font-semibold text-gray-800 transition-colors duration-300 rounded-md shadow focus:outline-none focus:ring-blue-200 focus:ring-2`}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
