import React from "react";
import { PlanType } from "@/types";
import Plan from "./Plan";
import { auth } from "@/auth";
import { prismadb } from "@/globals/db";

export default async function Plans(){
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("ユーザーが認証されていません");
  }

  try {
    const latestPlans = await prismadb.plan.findMany({
      where: {
        userId: userId,
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });

    console.log({latestPlans : latestPlans})

    // Prismaの返す型をPlanTypeに変換
    const plans: PlanType[] = latestPlans.map((plan) => ({
      id: plan.id,
      title: plan.title,
      content: plan.content ?? undefined,
      createdAt: plan.createdAt.toISOString(),
      updatedAt: plan.updatedAt.toISOString(),
      userId: plan.userId,
      user: plan.user,
      imageUrl: plan.imageUrl ?? undefined
    }));

    return (
      <>
        <div className="flex flex-col gap-4 overflow-y-scroll h-[80vh]">
          {plans.length >0 ?
             plans.map((plan) => <Plan key={plan.id} plan={plan} />)
            : "メモリがありません"}
        </div>
      </>
    );
    
  } catch (error) {
    console.error("メモリの取得に失敗しました:", error);
    throw new Error("メモリの取得に失敗しました");
  }
}

// "use client";
// import React, { useEffect, useState } from "react";
// import { PlanType } from "@/types";
// import Plan from "./Plan";
// import { getLatestplan } from "@/lib/getPlans";

// export default function Plans() {
//   const [plans, setPlans] = useState<PlanType[]>();

//   useEffect(() => {
//     async function getPlans() {
//       try {
//         const data = await getLatestplan();
//         setPlans(data);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     getPlans();
//   }, []);

//   if (!plans || plans.length < 1) {
//     return <div></div>;
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-4 overflow-y-scroll h-[80vh]">
//         {plans
//           ? plans.map((plan) => <Plan key={plan.id} plan={plan} />)
//           : "No plan"}
//       </div>
//     </>
//   );
// }
