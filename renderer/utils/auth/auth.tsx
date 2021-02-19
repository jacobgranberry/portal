/* eslint-disable consistent-return */
import React, { FC, useState, useContext, createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  authenticateMojang,
  validateMojangToken,
  MojangUserResponse,
  refreshMojangToken,
  invalidateMojangToken,
} from '../../services/mojang';
import { AuthRoutes } from '../../components/authRoute';
import { getUser, updateUser, createUser } from '../db/configManager';
import electron from 'electron';

const ipcRenderer: any = electron.ipcRenderer || false;

interface AuthContextInterface {
  user: MojangUserResponse | false;
  signin: (email: string, password: string) => Promise<boolean>;
  validate: () => Promise<any>;
  signout: () => Promise<boolean>;
  refresh: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState<MojangUserResponse | false>(false);

  // Handle a new user object (updates db and sets user state)
  const handleUser = (rawUser: any) => {
    if (rawUser) {
      // Add or update user in database
      createUser(rawUser);
      setUser(rawUser);
      return rawUser;
    }
    setUser(false);
    return false;
  };

  const signin = async (login: string, password: string) => {
    try {
      const response = await authenticateMojang(login, password);
      if (response.error) {
        toast.error(response.errorMessage, { className: 'bg-red-800 text-sm' });
        return false;
      } else {
        await handleUser(response.data);
        return true;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const refresh = async () => {
    try {
      const response = await refreshMojangToken();
      if (response.error) {
        toast.error(response.errorMessage, {
          className: 'bg-red-800 text-sm',
        });
      } else {
        handleUser(response.data);
        return response;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const signout = async () => {
    try {
      const response = await invalidateMojangToken();
      if (response.error) {
        toast.error(response.errorMessage, {
          className: 'bg-red-800 text-sm',
        });
      } else {
        await ipcRenderer.invoke('reset-settings', 'account');
        await handleUser(false);
        return true;
      }
    } catch (err) {
      console.log('Error signing out, routing to login');
      console.log(err);
      return false;
    }
  };

  const validate = async () => {
    try {
      const response = await validateMojangToken();
      if (response.error) {
        await refresh();
      } else {
        return true;
      }
      console.log('VAL RESPONSE: ', response);
    } catch (err) {
      throw new Error(err);
    }
    return null;
  };

  useEffect(() => {
    // Add user to state on mount
    (async () => {
      await ipcRenderer.invoke('get-all-settings').then((item) => {
        setUser(item.account);
      });
    })();
  }, []);

  return {
    user,
    signin,
    validate,
    signout,
    refresh,
  };
}

// Context Provider component that wraps your app and makes auth object
// available to any child component that calls the useAuth() hook.
export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
