import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        name: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = {
          id: "1",
          email: credentials?.email,
          name: credentials?.name
            ? `[신규유저] ${credentials?.name}`
            : "기존유저",
        };

        if (user) {
          return user;
        } else {
          throw new Error("noUser");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    // maxAge: 3 * 24 * 60 * 60,
    maxAge: 300,
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken as string;
      session.user.accessTokenExpires = token.accessTokenExpires as string;
      session.user.refreshToken = token.refreshToken as string;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
});

export { handler as GET, handler as POST };
