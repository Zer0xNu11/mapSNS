"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { redirect } from "next/navigation";


//サーバーアクションズ内でbindした値の型を定義
interface PlanFormState {
  error: string;
  planId : string;
  path: string;
}

export async function updatePlan(state: PlanFormState, formData: FormData) {
  const session = await auth();
  const title: string = formData.get("title") as string
  const content: string = formData.get("content") as string;
  
  const path = state.path;
  const planId = state.planId



  try {
    if (session?.user?.id) {
      const updatedPlan = await prismadb.plan.update({
        where:{id: planId},
        data: {
          title: title,
          content: content || '',
        },
      });
    } else {
      state.error = "ログインしてください";
      return state;
    }
  } catch (error) {
    console.log("更新失敗");
    console.log(error)
    state.error = "更新失敗";
    return state;
  }
  redirect(path);
}