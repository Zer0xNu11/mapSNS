import NextAuth from 'next-auth';
import { authConfig } from './authConfig';

export default NextAuth(authConfig).auth;

//ミドルウェア適用範囲設定 matcherでマッチするURLでmiddlewareは動作
export const config = {
  // matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  matcher: ['/testmiddleware'],
};

//Next.js は、エクスポートされたmiddleware関数を自動的にミドルウェアとして認識する