import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const login = async (data) => {
  const url = 'https://authserver.mojang.com/authenticate';
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
    process.env.NODE_ENV === 'development' ? 'http://localhost:8888' : process.env.NEXTAUTH_URL,
  providers: [
    Providers.Credentials({
      id: 'mojang-login',
      name: 'Mojang',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize({ username, password }) {
        try {
          const data = {
            agent: {
              name: 'Minecraft',
              version: 1,
            },
            username,
            password,
            requestUser: true,
          };
          const user = await login(data);

          if (user) {
            console.log('here set user');
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
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
    async jwt(token, user, account, profile, isNewUser) {
      console.log('user:', user);
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: '/',
    newUser: '/',
    error: '/',
  },
  debug: process.env.NODE_ENV === 'development',
};

export default (req, res) => NextAuth(req, res, options);
