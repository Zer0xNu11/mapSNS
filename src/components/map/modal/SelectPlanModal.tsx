"use client";

import { setCurrentPlanData } from "@/lib/localStorageHandler";
import { useEditPlan, usePlanSlot } from "@/store";
import { PlanType } from "@/types";
import Link from "next/link";
import React, { RefObject, useEffect, useState } from "react";

const getLatestPlans = async (): Promise<PlanType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/plans/getPlans`,
    {
      cache: "no-store", //キャッシュ無効化のオプション
    }
  );

  if (response.status !== 200) {
    throw new Error("不正な値です");
  }

  const data = await response.json();
  console.log({ data: data });
  return data.data as PlanType[];
};

interface SelectPlanModalProps {
  closeButtonRef: RefObject<HTMLButtonElement>;
}

const SelectPlanModal: React.FC<SelectPlanModalProps> = ({
  closeButtonRef,
}) => {
  const [userPlans, setUserPlans] = useState<PlanType[]>([]);
  const { setEditPlanData } = useEditPlan();

  const closeModal = () => {
    console.log("checke press button");
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };

  useEffect(() => {
    async function loadPlans() {
      const data = await getLatestPlans();
      setUserPlans(data);
    }

    loadPlans();
  }, []);

    return (
      <>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9000]">
          <div className="bg-white absolute rounded p-4 flex flex-col items-center w-[90%] max-w-md max-h-[70vh]">
            <div className="text-xl mb-4">メモリを選択</div>

            <div className="flex flex-col gap-4 overflow-y-auto w-full px-2 pb-4">
              <Link href="../create/plan">
                <button className="bg-green-400 rounded-xl text-xl w-full h-auto min-h-[4rem] mx-auto py-4 px-3 hover:opacity-70 flex items-center justify-center">
                  <div className="w-full break-words text-center">
                    +新しいメモリを作成
                  </div>
                </button>
              </Link>

              {userPlans.map((plan) => (
                <button
                  key={plan.id}
                  className="bg-blue-400  rounded-xl text-xl w-full h-auto min-h-[4rem] mx-auto py-4 px-3 hover:opacity-70 flex items-center justify-center"
                  onClick={() => {
                    setCurrentPlanData(plan.id, plan.title);
                    setEditPlanData(plan.id, plan.title);
                    closeModal();
                  }}
                >
                  <div className="w-full break-words text-center">
                    {plan.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
};

export default SelectPlanModal;
