"use server";

import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { redirect } from "next/navigation";


//サーバーアクションズ内でbindした値の型を定義
export interface PlanFormState {
  error: string;
  planId: string;
  positionLat?: number | null;
  positionLng?: number | null;
}

export async function createPlan(state: PlanFormState, formData: FormData) {
  const session = await auth();
  const title: string = formData.get("title") as string
  const content: string = formData.get("content") as string;

  try {
    if (session?.user?.id) {
      console.log('======into Try =========')
      const createdPlan = await prismadb.plan.create({
        data: {
          title: title,
          content: content || '',
          userId: session?.user?.id,
        },
        include: {
          user: true,
        },
      });

    }else {
      state.error = "ログインしてください";
      return state;
    }
  } catch (error) {
    console.log("Plan失敗");
    console.log(error)
    state.error = "投稿エラー";
    return state;
  }
  redirect("/home/plans");
}