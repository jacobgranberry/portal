import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const login = async (data) => {
  const url = "https://authserver.mojang.com/authenticate";
  const result = await axios
    .post(url, data)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      const { response } = error;
      return response.data;
    });
  return result;
};

const options = {
  NEXTAUTH_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8888"
      : process.env.NEXTAUTH_URL,
  providers: [
    Providers.Credentials({
      id: "mojang-login",
      name: "Mojang",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username, password }) {
        try {
          const data = {
            agent: {
              name: "Minecraft",
              version: 1,
            },
            username,
            password,
            requestUser: true,
          };
          const user = await login(data);
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    signingKey: process.env.JWT_SECRET,
  },
  callbacks: {
    async signIn(user, account, profile) {
      const isAllowedToSignIn = user && !user.error;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.accessToken;
        token.clientToken = user.clientToken;
        token.name = user.selectedProfile.name;
      }
      return token;
    },
    async session(session, token) {
      if (token) {
        session.accessToken = token.accessToken;
        session.clientToken = token.clientToken;
        session.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    newUser: "/",
    error: "/",
  },
  debug: process.env.NODE_ENV === "development",
};

export default (req, res) => NextAuth(req, res, options);
