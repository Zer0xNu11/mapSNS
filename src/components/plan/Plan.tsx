import { PlanType } from "@/types";
import { Button } from "../ui/button";
import Link from "next/link";

export interface PlanProps {
  plan: PlanType;
  isLiked?: boolean;
  countLikes? : number;
  imageUrl? : string;
}


const Plan: React.FC<PlanProps> = async ({plan}) => {
  return (
    <>
    <div className="bg-blue-300 shadow-md rounded-lg m-4 p-4 mb-4 flex flex-row justify-between h-[20vh]">
      <div className="mb-4 w-1/2 h-full">
        <div className="flex items-center mb-2">
          <div>
            <h2 className="font-semibold text-md">{plan.title}</h2>
            <p className="text-gray-500 text-sm ">
              {new Date(plan.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 break-all">{plan.content}</p>
      </div>
      <div className="w-1/2 h-full items-center">
      </div>
      <Link href={`/home/plans/${plan.id}`}>
      <Button>編集</Button>
      </Link>
    </div>
    </>
  );
};

export default Plan;
