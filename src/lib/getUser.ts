import { prismadb } from "@/globals/db";

export const getUser = async (userId : string) =>{
 const data = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      imageUrl:true,
      role:true
    },
  });
  return data;
}

export const getUserLink = async (userId : string) =>{
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,{
    cache:'no-store', //キャッシュ無効化のオプション
  });

  if(response.status !== 200){
    throw new Error('不正な値です');
  }

  const data = await response.json();
  console.log({data: data})
  return data.data
 }