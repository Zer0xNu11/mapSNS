import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthConfig } from "next-auth";
import { prismadb } from "./globals/db";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "./routes";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  basePath: "/api/auth",
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" }, //JWT利用によりサーバーメモリ節約
  callbacks: {

    // async session({token, session}){
    //   console.log({sessionToken: token})
    //   return session;
    // },

    // async jwt({token, user, profile}){
    //   console.log(token);
    //   return token;
    // },

    authorized({ request, auth }) {
      //認証前後の制約について設定する request情報 auth認証情報オブジェクト
      const isLoggedIn = !!auth?.user; //ログインしているかどうかチェック
      const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);
      const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

      //ログイン、レジスターのサイト訪問時に、
      if (isAuthRoute) {
        // ログイン済みの時リダイレクト
        if (isLoggedIn) {
          return Response.redirect(
            new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl)
          );
        }

        return true;
      }

      //ルートフォルダ以外のページにログインしていない時アクセスすると拒否
      if (!isPublicRoute && !isLoggedIn) {
        return false;
      }
      return true;

    },
  },
  providers: [],
} satisfies NextAuthConfig;
