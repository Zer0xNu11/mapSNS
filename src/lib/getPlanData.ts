import { auth } from "@/auth";
import { prismadb } from "@/globals/db";
import { PlanLeafletType, PlanPointType, PlanSlotType} from "@/types";

export const getPlanData = async (planId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/getPlanData/${planId}`, {
    cache: "no-store",
  });
  const data = await response.json();
  console.log({plandata:data})
  return data.data as PlanSlotType[];
};

// export const getPlanData = async (planId: string) => {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/getPlanData/${planId}`, {
//     cache: "no-store",
//   });
//   const data = await response.json();
//   console.log({plandata:data})
//   return {
//     planPoints: data.planPoints,
//     polylineCoordinates: data.polylineCoordinates,
//   };
// };


export const getPlanList = async (planId: string): Promise<PlanPointType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/getPlanList/${planId}`, {
    cache: "no-store",
  });

  const data = await response.json();
  console.log({plandata:data})
  return data.data as PlanPointType[];
};

