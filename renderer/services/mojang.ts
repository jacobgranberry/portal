import electron from 'electron';

const ipcRenderer: any = electron.ipcRenderer || false;

// Mojang auth API documented here: https://wiki.vg/Authentication

/**
 * Helper function to access the Mojang auth server
 * @param path
 * @param body
 */
export const mojangApi = (path: string, body: any) => {
  const BASE_URL = 'https://authserver.mojang.com';
  const config = {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${BASE_URL}${path}`, config)
    .then((res) => res.json())
    .then((json) => json);
};

interface ErrorResponse {
  error: boolean | string;
  errorMessage: string;
  cause?: string;
}
interface TokenResponse {
  accessToken: string;
  clientToken: string;
}

export interface MojangUserResponse extends TokenResponse {
  user: {
    id: string;
    username: string;
  };
  selectedProfile: {
    name: string;
    id: string;
  };
  availableProfiles: Array<{
    name: string;
    id: string;
  }>;
}

export interface MojangJSONResponse extends MojangUserResponse, ErrorResponse {}

/**
 * Authenticates a user using their password
 * @param username
 * @param password
 */
export const authenticateMojang = async (username: string, password: string) => {
  try {
    const response = await fetch('/api/mojang/auth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: username, password: password }),
    });
    return response.json();
  } catch (err) {
    console.log('err', err);
    return <MojangJSONResponse>{ error: true, errorMessage: err };
  }
};

/**
 * Refreshes a valid accessToken. It can be used to keep a user logged in between gaming sessions and is preferred over storing the user's password in a file
 * @param accessToken
 * @param clientToken
 */
export const refreshMojangToken = async () => {
  const refreshToken = await ipcRenderer.invoke('get-tokens');

  if (refreshToken) {
    const refreshBody = {
      accessToken: refreshToken.accessToken,
      clientToken: refreshToken.clientToken,
    };

    try {
      const response = await fetch('/api/mojang/refresh', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshBody),
      });
      return response.json();
    } catch (err) {
      console.error(err);
      return <MojangJSONResponse>{ error: true, errorMessage: err };
    }
  } else {
    throw new Error('No available refresh token.');
  }
};

/**
 *Checks if an accessToken is usable for authentication with a Minecraft server. The Minecraft Launcher (as of version 1.6.13) calls this endpoint on startup to verify that its saved token is still usable, and calls /refresh if this returns an error.
Note that an accessToken may be unusable for authentication with a Minecraft server, but still be good enough for /refresh. This mainly happens when one has used another client (e.g. played Minecraft on another PC with the same account). It seems only the most recently obtained accessToken for a given account can reliably be used for authentication (the next-to-last token also seems to remain valid, but don't rely on it).
/validate may be called with or without a clientToken. If a clientToken is provided, it should match the one used to obtain the accessToken. The Minecraft Launcher does send a clientToken to /validate.
 * @param accessToken
 * @param clientToken
 */
export const validateMojangToken = async () => {
  const refreshToken = await ipcRenderer.invoke('get-tokens');

  if (refreshToken) {
    const refreshBody = {
      accessToken: refreshToken.accessToken,
      clientToken: refreshToken.clientToken,
    };
    try {
      const response = await fetch('/api/mojang/validate', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshBody),
      });
      return response.json();
    } catch (err) {
      console.error(err);
      return <MojangJSONResponse>{ error: true, errorMessage: err };
    }
  } else {
    throw new Error('No available refresh token.');
  }
};

/**
 * Invalidates accessTokens using a client/access token pair.
 * @param accessToken
 * @param clientToken
 */
export const invalidateMojangToken = async () => {
  const refreshToken = await ipcRenderer.invoke('get-tokens');

  if (refreshToken) {
    const refreshBody = {
      accessToken: refreshToken.accessToken,
      clientToken: refreshToken.clientToken,
    };

    try {
      const response = await fetch('/api/mojang/invalidate', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshBody),
      });
      return response.json();
    } catch (err) {
      console.error(err);
      return <MojangJSONResponse>{ error: true, errorMessage: err };
    }
  } else {
    throw new Error('No available refresh token.');
  }
};
