// import { GetServerSideProps } from "next";
// import dynamic from "next/dynamic";
// import { cookies } from "next/headers";
// import React from "react";


// export default async function Home ({cookieData}:{cookieData: string | null}) {
//   // const planId = params.planId
//   const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home`
//   const cookieStore = cookies();
//   const currentPlanId = cookieStore.get("currentPlanId")?.value || null;
//   console.log("Cookie data:", currentPlanId);


//   const EditMap = React.useMemo(
//     () =>
//       dynamic(() => import("@/components/map/editMap/EditMap"), { //SSR停止　window error防止
//         loading: () => <p>map is loading</p>,
//         ssr: false,
//       }),
//     []
//   );

//   // const { planPoints, polylineCoordinates } = await getPlanData(planId);


//   return (
//     <div className="w-full h-[100vh] flex flex-row">
//       <div className="w-[100%] h-[80vh]">
//        <EditMap />
//       </div>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { req } = context;
//   const cookieData = [
//     req.cookies.currentPlanId, 
//     req.cookies.currentPlanTitle, 
//     req.cookies.currentNoteId, 
//     req.cookies.currentNoteTitle, 
//   ]
//   || null; // クッキーからデータを取得

//   return {
//     props: {
//       cookieData, // クライアントに渡すデータ
//     },
//   };
// };


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