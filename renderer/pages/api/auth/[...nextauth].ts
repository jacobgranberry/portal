import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {
  authenticateMojangLogin,
  validateMojangToken,
  refreshMojangToken,
} from "../../../services/mojang";

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
          const user = await authenticateMojangLogin(username, password);
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
    {
      id: "microsoft",
      name: "Microsoft",
      type: "oauth",
      version: "2.0",
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      params: { grant_type: "authorization_code" },
      accessTokenUrl: "https://accounts.google.com/o/oauth2/token",
      requestTokenUrl: "https://accounts.google.com/o/oauth2/auth",
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/auth?response_type=code",
      profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      async profile(profile, tokens) {
        // You can use the tokens, in case you want to fetch more profile information
        // For example several OAuth provider does not return e-mail by default.
        // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      clientId: "",
      clientSecret: "",
    },
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
      // Signing in
      if (user) {
        return {
          accessToken: user.accessToken,
          clientToken: user.clientToken,
          name: user.selectedProfile.name,
          userId: user.selectedProfile.id,
        };
      }

      // Subsequent use of JWT, the user has been logged in before
      // if token is still validated, return token
      const isValidated = await validateMojangToken(
        token.accessToken,
        token.clientToken
      );
      if (isValidated === "" || isValidated === {}) {
        return token;
      }
      // validation has expired, try to refresh it
      return refreshMojangToken(token);
    },
    async session(session, token) {
      if (token) {
        session.accessToken = token.accessToken;
        session.clientToken = token.clientToken;
        session.name = token.name;
        session.userId = token.userId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};

export default (req, res) => NextAuth(req, res, options);
