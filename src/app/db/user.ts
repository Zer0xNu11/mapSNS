import { prismadb } from '@/globals/db';

export const getUserByEmail = async (email: string) => {
  try {
    //.findUnique(){ where: { email } }: emailという変数に格納されたメールアドレスと一致するユーザーを検索
    const user = await prismadb.user.findUnique({ where: { email } });

    return user;
  } catch (error) {
    return null;
  }
};