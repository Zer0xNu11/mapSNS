//削除予定
// "use client";

// import { createPost, PostFormState } from "@/actions/createPost";
// import { useFormState, useFormStatus } from "react-dom";
// import { useEffect, useRef, useState } from "react";
// import { useMarkerStore, useSelectedPostStore } from "@/store";
// import type { PutBlobResult } from "@vercel/blob";
// import Loading from "@/app/loading";

// import { createPlan, PlanFormState } from "@/actions/createPlan";
// import { LatLng } from "leaflet";
// import { tracePost } from "@/lib/createPlan";

// interface Plan{
//   Plan: object
// }

// interface MakePlanOnMarkerProps {
//   planId : string
//   position : LatLng
// }

// const MakePlanOnMarker: React.FC<MakePlanOnMarkerProps> = ({planId}) => {
//   // const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home/notes/${planId}`;

//   const [text, setText] = useState("");
//   const initialState: PlanFormState = {
//     error: "",
//     planId: planId,
//   };
//   const [state, formAction] = useFormState(createPlan, initialState);
//   const { selectedPostId } = useSelectedPostStore();

//   const limitLength = 60; //文字数制限
//   const [remLength, setRemLength] = useState(limitLength);
//   const [loading, setLoading] = useState(false);

//   const PendLoading = () => {
//     const { pending } = useFormStatus();
//     return pending ? <Loading /> : "";
//   };

//   const onClick = async() =>{
//     if(planId && selectedPostId){
//       await tracePost(planId, selectedPostId) 
//     }
//   }

//   const SubmitButton = () => {
//     const { pending } = useFormStatus();
//     return (
//       <>
//         <button
//           onClick = {onClick}
//           type="submit"
//           className={`mt-2 bg-gray-700 hover:bg-gray-600 duration-200 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-300`}
//           disabled={remLength < 0 || pending}
//         >
//           プランへ追加
//         </button>
//         <PendLoading />
//       </>
//     );
//   };

//   const { marker } = useMarkerStore();

//   const fileSelectRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     setRemLength(limitLength - text.length);
//   }, [text]);

//   useEffect(() => {
//     state.positionLat = marker?.lat || null;
//     state.positionLng = marker?.lng || null;
//   }, [marker]);



//   {
//     return (
//       <div
//         className={'w-full right-0 left-0 bg-gray-100 '}
//       >
//         <div className="bg-white shadow-md rounded p-4 mb-4 flex flex-col items-center">
//           <form action={formAction}>
//             <textarea
//               name="post"
//               className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="What's on your mind?"
//               onChange={(e) => {
//                 setText(e.target.value);
//               }}
//             ></textarea>
//             <div
//               className={`${remLength >= 0 ? "" : "text-red-500"}`}
//             >{`残り${remLength}文字`}</div>

//             <SubmitButton />
//           </form>
//         </div>
//       </div>
//     );
//   }
// };

// export default MakePlanOnMarker;
