/* eslint-disable react/display-name */
import React from 'react';

interface InputInterface extends Partial<HTMLInputElement> {
  label: string;
  name: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, InputInterface>(
  ({ label, name }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          ref={ref}
          type="checkbox"
          name={name}
          className="mt-2 w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
        />
        <label
          htmlFor={name}
          className="mt-2 text-sm font-semibold text-gray-500 dark:text-gray-200"
        >
          {label}
        </label>
      </div>
    );
  }
);
