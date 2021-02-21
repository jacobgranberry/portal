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

          if (user && !user.error) {
            console.log("here set user");
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return Promise.reject(null);
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
    maxAge: 1 * 3 * 60 * 60, // 3 hrs
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn(user, account, profile) {
      console.log("USER: ", user);
      const isAllowedToSignIn = user && !user.error;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log("token", token);
      return token;
    },
  },
  pages: {
    signIn: "/",
    newUser: "/",
    error: "/",
  },
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
