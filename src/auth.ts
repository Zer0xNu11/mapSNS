import { getUserByEmail } from "@/app/db/user";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/schemas";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "./routes";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismadb } from "./globals/db";

export const config: NextAuthConfig = {
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" }, //JWT利用によりサーバーメモリ節約
  callbacks: {
    //session

    authorized({ auth, request: { nextUrl } }) {
      //request.nextUrlは現在アクセスしようとしているURLを示す（URLは分割してはいっている）
      /*
        https://example.com/dashboard にアクセスしようとしている場合
        nextUrl.pathname: パス（例: /dashboard）
        nextUrl.host: ホスト名（例: example.com）
        nextUrl.protocol: プロトコル（例: https:）
        nextUrl.search: クエリ文字列（例: ?key=value）
        nextUrl.hash: URLのハッシュ部分（例: #section1）
      */
      //認証前後の制約について設定する request情報 auth認証情報オブジェクト
      const isLoggedIn = !!auth?.user; //ログインしているかどうかチェック
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      try {
        //ログイン、レジスターのサイト訪問時に、
        if (isAuthRoute) {
          // ログイン済みの時リダイレクト
          if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
          }

          return true;
        }

        //ルートフォルダ以外のページにログインしていない時アクセスすると拒否
        if (!isPublicRoute && !isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        // session.user.image = token.
      }

      return session;
    },

    async jwt({ token, trigger, session }) {
      // console.log(token);
      return token;
    },
  },

  providers: [
    // // OAuth設定
    // github({
    //   clientId: process.env.AUTH_GITHUB_ID,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET,
    // }),

    // google({}),

    // パスワード認証 ログイン関連
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

/*  
=======auth のプロパティ========
user: ログインしているユーザーの情報
{
  name: ユーザーの表示名
  email: ユーザーのメールアドレス
  image: ユーザーのプロフィール画像URL（設定されている場合）
  id: ユーザーの一意識別子（データベースのIDなど）
}

expires: セッションの有効期限（ISO 8601形式の日時文字列）
accessToken: OAuth プロバイダから提供されるアクセストークン（使用している場合）
refreshToken: アクセストークンを更新するためのリフレッシュトークン（使用している場合）
error: 認証エラーが発生した場合のエラー情報

========requetのプロパティ========
nextUrl: 現在のリクエストのURL情報（URL オブジェクト）

pathname: URLのパス部分
search: クエリ文字列
searchParams: クエリパラメータ（URLSearchParams オブジェクト）
host: ホスト名
protocol: プロトコル（'http:' or 'https:'）


headers: リクエストヘッダー（Headers オブジェクト）

get(name): 特定のヘッダーの値を取得
has(name): 特定のヘッダーの存在を確認


cookies: リクエストのクッキー（RequestCookies オブジェクト）

get(name): 特定のクッキーの値を取得
getAll(): すべてのクッキーを取得


method: HTTPメソッド（'GET', 'POST'など）
url: リクエストの完全なURL文字列
body: リクエストボディ（POSTリクエストの場合）
geo: クライアントの地理情報（設定されている場合）

city: 都市名
country: 国名
region: 地域名


ip: クライアントのIPアドレス

*/
