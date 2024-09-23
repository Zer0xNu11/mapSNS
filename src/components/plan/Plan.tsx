"use client";
import { PlanType } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";

export interface PlanProps {
  plan: PlanType;
  countLikes?: number;
  imageUrl?: string;
}

const Plan: React.FC<PlanProps> = async ({ plan }) => {
  return (
    <>
      <div className="bg-blue-300 shadow-md rounded-lg m-4 p-4 mb-4 flex flex-row justify-between h-[20vh]">
        <div className="mb-4 w-3/4 h-full">
          <div className="flex flex-col mb-2">
            <h2 className="text-gray-700 break-all font-bold">{plan.title}</h2>
            <div>
              <p className="text-gray-500 text-sm ">
                {new Date(plan.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          {/* <p className="text-gray-700 break-all">{plan.content}</p> */}
        </div>
        <div className="h-full items-end">
        <Link href={`/home/plans/${plan.id}`}>
          <Button>編集</Button>
        </Link>
        </div>
      </div>
    </>
  );
};

export default Plan;
