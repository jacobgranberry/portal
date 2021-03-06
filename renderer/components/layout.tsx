import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { DevTools } from './devTools';
import { Spinner } from './spinner';
interface LayoutProps {
  loading?: boolean;
  children?: ReactNode;
}

export const Layout = ({ children, loading }: LayoutProps) => {
  return (
    <div
      className="w-screen h-screen bg-gray-100 dark:bg-gray-900 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${'../public/backgrounds/0.jpg'})` }}
    >
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        children
      )}
      <DevTools />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
