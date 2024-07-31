// 'use server'

// import { auth } from "@/auth";
// import { prismadb } from "@/globals/db";
// import { redirect } from "next/navigation";

// export async function post(formData: FormData){
//   const session = await auth();
//   const content:string = formData.get('post') as string;
//   console.log({
//     memo: 'action/post.ts',
//     session: session})
//   if(content === null){
//     throw new Error
//   }
//   try{
//     if(session?.user?.id){
//     await prismadb.post.create({
//       data:{
//         content: content || '',
//         authorId: session?.user?.id,
//       },
//       include:{
//         author: true,
//       },
//     });
//     redirect('/home')
//   }
//   }catch(error){
//     console.log('投稿できない')
//     throw error;
//   }
// }