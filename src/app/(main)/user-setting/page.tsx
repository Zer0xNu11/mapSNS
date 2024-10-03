import { auth } from '@/auth'
import EditUserData from '@/components/EditUserData';
import MakeDummy from '@/components/MakeDummy';
import { Button } from '@/components/ui/button'
import { prismadb } from '@/globals/db';
import React from 'react'

const UserSetting = async() => {
const session = await auth();
  const userId = session?.user?.id
  if (!userId) {
    return <div>認証エラー 再度ログインしてください</div>;
  }


  const data = await getUserData(userId);

  async function getUserData(userId: string) {
    const result = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        imageUrl:true,
        role:true
      },
    });

    if (!result) {
      return null;
    }


    return {
      userId: userId,
      userName: result.name,
      imageUrl: result.imageUrl,
      role: result.role,
    };
  }

  if (!data) {
    return <div>存在しないアカウントです</div>;
  }

  const userData = {
    userId: userId,
    userName: data.userName ?? undefined,
    imageUrl: data.imageUrl ?? undefined,
  };

  return (
    <>
     {data.role === 'ADM' ? <MakeDummy /> : ''}
     <EditUserData data={userData} />
    </>
  );
};

export default UserSetting