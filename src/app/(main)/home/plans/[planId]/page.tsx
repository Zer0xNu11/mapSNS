import React from "react";

interface Params {
  params: { planId: string };
}

const PlanPage = async ({params}:Params) => {
  const planId = params.planId
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home/plans/${planId}`


  return (
    <div className="w-full h-[100vh] flex flex-row">
      <div className="w-[100%] h-[80vh]">
        Under Construction
      </div>
    </div>
  );
};

export default PlanPage;
