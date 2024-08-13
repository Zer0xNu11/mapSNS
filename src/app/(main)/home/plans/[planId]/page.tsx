import { getPlanPoints } from "@/lib/getPlansPoints";
import dynamic from "next/dynamic";
import React from "react";

interface Params {
  params: { planId: string };
}

// const getBookData = async (bookId: string): Promise<BookType> => {
//   const response = await fetch(
//     `${process.env.API_URL}/books/getNoteData/${bookId}`,
//     {
//       cache: "no-store", //キャッシュ無効化のオプション
//     }
//   );

//   if (response.status !== 200) {
//     throw new Error("不正な値です");
//   }

//   const data = await response.json();
//   return data.data as BookType;
// };

// const BookPage = async ({ params }: Params) => {
//   const bookId = params.bookId;
  
//   try {
//     const book = await getBookData(bookId);
//     if (!book) {
//       return <Loading />;
//     }
//     return (
//       <>
//       BookPage
//       </>
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

// export default BookPage;

const PlanMap = async ({params}:Params) => {
  const planId = params.planId
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home/plans/${planId}`

  const EditMap = React.useMemo(
    () =>
      dynamic(() => import("@/components/map/editMap/EditMap"), { //SSR停止　window error防止
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );

  const { posts, polylineCoordinates } = await getPlanPoints(planId);


  return (
    <div className="w-full h-[100vh]">
      <div className="w-[80%] h-[80vh]">
        <EditMap planId={planId} posts={posts} polylineCoordinates={polylineCoordinates} />
      </div>
    </div>
  );
};

export default PlanMap;
