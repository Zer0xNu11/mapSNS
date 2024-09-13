"use client";
import React, { useEffect, useRef } from "react";
import PlanPoint from "./PlanPoint";
import { PlanPointType } from "@/types";
import { usePlanListDisplayMode, useSelectedPlanPointStore } from "@/store";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export interface PlanPointsProps {
  planPoints: PlanPointType[];
  id: string;
}

export default function PlanPoints({ planPoints, id }: PlanPointsProps) {
  const { selectedPlanPointId } = useSelectedPlanPointStore();
  const { planListDisplayMode, setPlanListDisplayMode } =
    usePlanListDisplayMode();

  const { setNodeRef } = useDroppable({
    id: id,
  });

  const planPointsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPlanPointId && planPointsRef.current) {
      const selectedPlanPoint = planPointsRef.current.querySelector(
        `[data-planpoint-id="${selectedPlanPointId}"]`
      );
      if (selectedPlanPoint && planListDisplayMode === "list") {
        selectedPlanPoint.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selectedPlanPointId, planListDisplayMode]);

  return (
    <>
      <SortableContext id={id} items={planPoints} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef}>
          <div ref={planPointsRef}>
            {planPoints
              ? planPoints.map((planpoint) => (
                  <PlanPoint
                    key={planpoint.id}
                    id={planpoint.id}
                    planpoint={planpoint}
                  />
                ))
              : "No planpoint"}
          </div>
        </div>
      </SortableContext>
    </>
  );
}
