"use client";
import React, { useEffect, useState } from "react";
import { PlanPointType } from "@/types";
import { Image } from "@phosphor-icons/react/dist/ssr/Image";
import { ChatText } from "@phosphor-icons/react/dist/ssr/ChatText";
import { usePlanSlot, usePostDisplayMode } from "@/store";
import { getPlanData, getPlanList } from "@/lib/getPlanData";
import PlanPoints from "@/components/planPoint/PlanPoints";
import {
  useSensors,
  PointerSensor,
  useSensor,
  KeyboardSensor,
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { updatePlanOrderData } from "@/lib/updatePlanData";

const ListFromPlan = ({ planId }: { planId: string }) => {
  const { postDisplayMode, setPostDisplayMode } = usePostDisplayMode();
  const { planSlot, setPlanSlot } = usePlanSlot();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!active.id || !over || !over.id) return;
    if (active.id !== over?.id) {
      const newPlanSlot = [...planSlot];
      const oldIndex = newPlanSlot.findIndex((item) => item.id === active.id);
      const newIndex = newPlanSlot.findIndex((item) => item.id === over?.id);
  
      if(oldIndex === -1 || newIndex === -1){
        return console.log('-1 detected')
      }
      const reorderedPlanSlot = arrayMove(newPlanSlot, oldIndex, newIndex);
      console.log({activeId:active.id, newIndex:newIndex})
      console.log({oldIndex:oldIndex, newIndex:newIndex})
      console.log({planSlot:planSlot})
      try{
        setPlanSlot(reorderedPlanSlot);
        await updatePlanOrderData(reorderedPlanSlot)
      }catch(error){
        console.log(error)
      }
    }

  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200, // 200ミリ秒以上のホールドでドラッグ開始
        tolerance: 5, // 5ピクセル以上の移動でドラッグ開始
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const togglePostDisplayMode = () => {
    postDisplayMode === "pict"
      ? setPostDisplayMode("text")
      : setPostDisplayMode("pict");
  };

  console.log({ planSlot: planSlot });


  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="rounded-xl relative pb-[400px]">
          <div className="fixed bottom-0 h-12 my-4 z-[1000]">
            <button
              className="bg-gray-100 rounded-tr-full p-4"
              onClick={togglePostDisplayMode}
            >
              {postDisplayMode === "pict" ? (
                <ChatText
                  className="mt-2"
                  size={32}
                  color="#080808"
                  weight="duotone"
                />
              ) : (
                <Image
                  className="mt-2"
                  size={32}
                  color="#262626"
                  weight="duotone"
                />
              )}
            </button>
          </div>
          <main className="container mx-auto py-4">
            {planSlot ? (
              <PlanPoints planPoints={planSlot} id={planId} />
            ) : (
              ""
            )}
          </main>
        </div>
      </DndContext>
    </>
  );
};

export default ListFromPlan;
