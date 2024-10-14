"use client";

import { PlanPointType } from "@/types";
import Image from "next/image";
import {
  useListDisplayMode,
  usePostDisplayMode,
  useSelectedPlanPointStore,
} from "@/store";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlanPointToolMenu from "../ui/PlanPointToolMenu";
import { useEffect, useRef } from "react";

export interface PlanPointProps {
  planpoint: PlanPointType;
  id: string;
  imageUrl?: string;
}

const PlanPoint: React.FC<PlanPointProps> = ({ planpoint, id }) => {
  const { selectedPlanPointId, setSelectedPlanPointId } =
    useSelectedPlanPointStore();
  const { postDisplayMode } = usePostDisplayMode();
  const ref= useRef<HTMLDivElement | null>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
  };

  const clickHandler = () => {
    if (!isDragging) {
      setSelectedPlanPointId(planpoint.id);
    }
  };

  useEffect(() =>{
    const element = ref.current;
    if (!element) return;
    const preventScroll = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    element.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      element.removeEventListener('touchmove', preventScroll);
    };
  },[isDragging])

  return (
    <>
      <div ref={(node) => {
        setNodeRef(node);
        if (node !== null) {
          ref.current = node;
        }
      }} 
      {...attributes} {...listeners} style={style}>
        <div
          id={id}
          className={`relative shadow-md rounded-2xl  mb-4 h-44 [perspective:1000px]  ${
            selectedPlanPointId === planpoint.id
              ? "border-2 border-blue-500"
              : ""
          }`}
          onClick={clickHandler}
          data-planpoint-id={planpoint.id}
        >
          <motion.div
            className={` bg-white mb-4 h-full flex flex-col [backface-visibility:hidden] rounded-2xl p-4`}
            // ${
            //   post.imageUrl && postDisplayMode === "pict" ? "hidden" : ""
            // }
            initial={false}
            animate={{
              rotateY:
                planpoint.imageUrl && postDisplayMode === "pict" ? 180 : 0,
            }}
            transition={{ duration: 0.6 }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex items-center mb-2 w-[280px]">
              <div className="flex flex-col w-full">
                {/* <h2 className="font-semibold text-md">{planpoint.user?.name || '名無し'}</h2> */}
              </div>
            </div>
            <div className="w-full">
              <p className="text-gray-700 break-word whitespace-pre-line line-clamp-4">
                {planpoint.content}
              </p>
            </div>
          </motion.div>
          <motion.div
            className={`bg-white rounded-2xl w-full h-full items-center [backface-visibility:hidden] absolute top-0 `}
            // ${
            //   post.imageUrl && postDisplayMode === "pict" ? "" : "hidden"
            // }
            initial={false}
            animate={{
              rotateY:
                planpoint.imageUrl && postDisplayMode === "pict" ? 0 : 180,
            }}
            transition={{ duration: 0.6 }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <img
              className="object-cover w-full h-full rounded-2xl"
              src={planpoint.imageUrl || "/images/blank.png"}
              alt="Post Image"
            />
          </motion.div>
          <div className="absolute z-30 right-2 bottom-2 ">
            <PlanPointToolMenu planPointId={planpoint.id} postId={planpoint.postId}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanPoint;
