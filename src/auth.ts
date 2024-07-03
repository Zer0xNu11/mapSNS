import { getUserByEmail } from "@/app/db/user";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "@/authConfig";
import Credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import { LoginSchema } from "./lib/schemas";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    // パスワード認証
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
    //OAuth設定
    // github({
    //   clientId: process.env.AUTH_GITHUB_ID,
    //   clientSecret:process.env.AUTH_GITHUB_SECRET,
    // }),
  ],
});

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
