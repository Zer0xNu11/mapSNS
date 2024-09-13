import { PlanPointType } from "@/types";

export const updatePlanOrderData = async (reorderedPlanSlot: PlanPointType[]) => {

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/plans/updatePlanOrderData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reorderedPlanPoints: reorderedPlanSlot }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update order");
    }

    console.log("Order updated successfully");
    const data = await response.json();
    console.log({ tracePostData: data });
    return data.data;
    
  } catch (error) {
    console.error("Error updating order:", error);
    // エラーハンドリング（UIの更新、ユーザーへの通知など）
  }

};
