"use client";

import { memo } from "react";
import { EdgeProps, getSmoothStepPath } from "reactflow";

function EdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
    offset: 30,
  });

  const isLearned = data?.sourceLearned && data?.targetLearned;
  const isActive = data?.sourceLearned && !data?.targetLearned;
  const accent = data?.accent || "#3b82f6";

  return (
    <>
      {/* Background glow for learned paths */}
      {isLearned && (
        <path
          d={edgePath}
          fill="none"
          stroke={accent}
          strokeWidth={4}
          strokeOpacity={0.15}
          className="react-flow__edge-path"
        />
      )}

      {/* Main edge */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={
          isLearned ? "#10b981" : isActive ? accent : "#1e2d45"
        }
        strokeWidth={isLearned ? 2 : isActive ? 2 : 1}
        strokeOpacity={isLearned ? 0.8 : isActive ? 0.7 : 0.3}
        strokeDasharray={isLearned ? "none" : isActive ? "6 3" : "4 4"}
        className={`react-flow__edge-path ${isActive ? "edge-animated" : ""}`}
      />
    </>
  );
}

export default memo(EdgeComponent);
