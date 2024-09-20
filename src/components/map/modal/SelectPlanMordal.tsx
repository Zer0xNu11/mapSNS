"use client";

import Plan from "@/components/plan/Plan";
import { PlanType } from "@/types";
import React from "react";
import { useSession } from "next-auth/react";

const getLatestplan = async (): Promise<PlanType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/plans/getPlans`,
    {
      cache: "no-store", //キャッシュ無効化のオプション
    }
  );
  // console.log('Fetching URL:', response);

  if (response.status !== 200) {
    throw new Error("不正な値です");
  }

  const data = await response.json();
  console.log({ data: data });
  return data.data as PlanType[];
};


const SelectPlanModal = async () => {
  // const { data: session, status } = useSession();
  // const userId = session?.user?.id;
  const userPlans = await getLatestplan();

  if (userPlans) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white absolute rounded p-4 flex flex-col  items-center w-[90%] max-w-md">
            <div className="flex-grow overflow-y-scroll w-full px-2 pb-4 max-h-[70vh]">
              {userPlans
                ? userPlans.map((plan) => <Plan key={plan.id} plan={plan} />)
                : "No plan"}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>プランデータが見つかりません</div>
      </>
    );
  }
};

export default SelectPlanModal;
