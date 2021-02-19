/* eslint-disable react/display-name */
import React, { useState, ReactNode } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputInterface extends Partial<HTMLInputElement> {
  helperText?: ReactNode;
  label: string;
  name: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputInterface>(
  ({ helperText, label, name, type = 'text', error }, ref) => {
    const [eye, setEye] = useState(false);

    return (
      <div className="flex flex-col space-y-1 relative">
        <div className="flex items-center justify-between">
          <label
            htmlFor={name}
            className="text-sm font-sans font-semibold text-gray-500 dark:text-gray-200"
          >
            {label}
          </label>
          {helperText}
        </div>
        <input
          ref={ref}
          type={!eye ? 'text' : 'password'}
          name={name}
          className=" text-gray-700 dark:text-gray-50 bg-white dark:bg-gray-800 px-4 py-2 transition duration-300 border border-gray-300 dark:border-gray-700 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-300"
        />
        {type === 'password' && (
          <button type="button" className="cursor-pointer" onClick={() => setEye(!eye)}>
            {!eye ? (
              <FaEyeSlash size={20} className="text-gray-400 absolute right-6 inset-y-2/4" />
            ) : (
              <FaEye size={20} className="text-gray-400 absolute right-6 inset-y-2/4" />
            )}
          </button>
        )}
        {error && <p className="absolute text-xs left-0 -bottom-5 text-red-500">{error}</p>}
      </div>
    );
  }
);
