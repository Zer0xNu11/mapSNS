import dynamic from "next/dynamic";
import React from "react";


export default async function Home () {
  // const planId = params.planId
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home`


  const EditMap = React.useMemo(
    () =>
      dynamic(() => import("@/components/map/editMap/EditMap"), { //SSR停止　window error防止
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );

  // const { planPoints, polylineCoordinates } = await getPlanData(planId);


  return (
    <div className="w-full h-[100vh] flex flex-row">
      <div className="w-[100%] h-[80vh]">
       <EditMap />
      </div>
    </div>
  );
};
