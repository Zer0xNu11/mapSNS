"use client"
import React, { useEffect, useRef } from "react";
import PlanPoint from "./PlanPoint";
import { PlanPointType } from "@/types";
import {usePlanListDisplayMode, useSelectedPlanPointStore } from "@/store";

export interface PlanPointsProps {
  planPoints: PlanPointType[];
}

export default function PlanPoints({ planPoints }: PlanPointsProps) {
  const { selectedPlanPointId } = useSelectedPlanPointStore();
  const {planListDisplayMode, setPlanListDisplayMode} = usePlanListDisplayMode();


  const planPointsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPlanPointId && planPointsRef.current) {
      const selectedPlanPoint = planPointsRef.current.querySelector(
        `[data-planpoint-id="${selectedPlanPointId}"]`
      );
      if (selectedPlanPoint && planListDisplayMode ==='list') {
        selectedPlanPoint.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedPlanPointId, planListDisplayMode]);

  return (
    <>
      <div ref={planPointsRef}>
        {planPoints
          ? planPoints.map((planpoint) => <PlanPoint key={planpoint.id} id={planpoint.id} planpoint={planpoint} />)
          : "No planpoint"}
      </div>
    </>
  );
}