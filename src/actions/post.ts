'use server'

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";

export async function post(formData: FormData){
  const session = await auth();
  const content:string = formData.get('post') as string;
  if(content === null){
    throw new Error
  }
  try{
    if(session?.user?.id){
    await prismadb.post.create({
      data:{
        content: content,
        authorId: session?.user?.id,
      },
      include:{
        author: true,
      },
    });
  }
  console.log(session)
  }catch(error){
    throw error;
  }
}