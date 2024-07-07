import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthConfig } from "next-auth";
import { prismadb } from "./globals/db";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "./routes";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  basePath: "/api/auth",
  // adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" }, //JWT利用によりサーバーメモリ節約
  callbacks: {

    //session
    
    // async session({token, session}){
    //   if(token.sub && session.user){
    //     session.user.id = token.sub;
    //   }
      
    //   return session;
    // },

    // jwt({token, trigger, session}){
    //   if(trigger === 'update')token.name = session.user.name;
    //   return token;
    // },

    



    authorized({ auth, request:{nextUrl} }) {
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

      //ログイン、レジスターのサイト訪問時に、
      if (isAuthRoute) {
        // ログイン済みの時リダイレクト
        if (isLoggedIn) {
          return Response.redirect(
            new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
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

/*
「JWTコールバック」の説明：
このコールバック関数は、JSONウェブトークン（JWT）が作成されたり更新されたりするたびに呼び出されます。具体的には：

作成時：

ユーザーがサインイン（ログイン）するとき


更新時：

クライアント側（ブラウザなど）でセッション情報にアクセスするとき



この関数の重要なポイント：

この関数で返す内容はすべてJWTに保存されます。
保存された情報は後で「セッションコールバック」に渡されます。
セッションコールバックで、クライアントに返す情報を制御できます。
JWTに保存されても、セッションコールバックで返さない情報はフロントエンド（クライアント側）には送られません。

セキュリティについて：

JWTは、環境変数 AUTH_SECRET を使って暗号化されます。これはデフォルトの動作です。

つまり、このコールバックは：

ユーザー認証情報の初期設定
セッション中の認証情報の更新
クライアントに送る情報の準備

これらの役割を果たし、安全かつ効率的な認証システムの構築を助けます。ここで設定した情報を基に、セッションコールバックでクライアントに渡す情報を細かく制御できるのが大きな特徴です。
*/
