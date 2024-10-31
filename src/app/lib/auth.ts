/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.API_AUTH;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials", {
            cause: { err: { code: "credentials" } },
          });
        }
        try {
          const response = await fetch(
            `${API_URL}/auth/v1/token?grant_type=password`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.28.4",
                Apikey: process.env.ANON_KEY || "",
              },
              body: JSON.stringify({
                email: "stackaitest@gmail.com", //TODO: remove this
                password: "!z4ZnxkyLYs#vR", //TODO: remove this
                gotrue_meta_security: {},
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data?.errors?.[0]?.detail || "Authentication failed BET",
              {
                cause: { err: { code: "credentials" } },
              }
            );
          }

          if (!data.access_token) {
            throw new Error("No access token", {
              cause: { err: { code: "credentials" } },
            });
          }

          return {
            id: data.user.id || credentials.email,
            email: credentials.email,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_at: data.expires_at,
          };
        } catch (error: any) {
          console.error("5. Authorization Error:", error);
          throw new Error(error.message || "Authentication failed", {
            cause: { err: { code: "credentials" } },
          });
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          access_token: user.access_token,
          refresh_token: user.refresh_token,
          expires_at: user.expires_at,
        };
      }
      return token;
    },
    session({ session, token }) {
      if (token.error) {
        return { ...session, error: token.error };
      }

      return {
        ...session,
        access_token: token.access_token,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
    verifyRequest: "/auth",
    newUser: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: true,
};
