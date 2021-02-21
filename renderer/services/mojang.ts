import axios from "axios";

/**
 * Authenticates a user using their password
 * @param username
 * @param password
 */
export const authenticateMojangLogin = async (username, password) => {
  const url = "https://authserver.mojang.com/authenticate";
  const data = {
    agent: {
      name: "Minecraft",
      version: 1,
    },
    username,
    password,
    requestUser: true,
  };
  const response = await axios
    .post(url, data)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response.data;
    });
  return response;
};

/**
 *Checks if an accessToken is usable for authentication with a Minecraft server. The Minecraft Launcher (as of version 1.6.13) calls this endpoint on startup to verify that its saved token is still usable, and calls /refresh if this returns an error.
Note that an accessToken may be unusable for authentication with a Minecraft server, but still be good enough for /refresh. This mainly happens when one has used another client (e.g. played Minecraft on another PC with the same account). It seems only the most recently obtained accessToken for a given account can reliably be used for authentication (the next-to-last token also seems to remain valid, but don't rely on it).
/validate may be called with or without a clientToken. If a clientToken is provided, it should match the one used to obtain the accessToken. The Minecraft Launcher does send a clientToken to /validate.
 * @param accessToken
 * @param clientToken
 */
export const validateMojangToken = async (accessToken, clientToken) => {
  try {
    const url = `https://authserver.mojang.com/validate`;

    const response = await axios
      .post(url, { accessToken, clientToken })
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        const { response } = error;
        return response.data;
      });

    return response;
  } catch (error) {
    return {
      error: true,
      errorMessage: "ValidateAccessTokenError",
    };
  }
};

/**
 * Refreshes a valid accessToken. It can be used to keep a user logged in between gaming sessions and is preferred over storing the user's password in a file (see lastlogin)
 * @param token
 */

export const refreshMojangToken = async (token) => {
  const url = `https://authserver.mojang.com/refresh`;

  try {
    const response: any = await axios.post(url, {
      accessToken: token.accessToken,
      clientToken: token.clientToken,
      requestUser: true,
    });

    if (!response) {
      throw response;
    }
    return {
      ...token,
      accessToken: response.accessToken,
      clienttoken: response.clientToken,
    };
  } catch (error) {
    return {
      ...token,
      error: true,
      errorMessage: "RefreshAccessTokenError",
    };
  }
};

/**
 * Invalidates accessTokens using a client/access token pair.
 * @param accessToken
 * @param clientToken
 */
export const invalidateMojangToken = async (accessToken, clientToken) => {
  const url = `/api/mojang/invalidate`;

  await axios
    .post(url, {
      accessToken,
      clientToken,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response.data;
    });
};
