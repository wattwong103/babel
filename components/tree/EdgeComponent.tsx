"use client";

import { memo } from "react";
import { EdgeProps, Position } from "reactflow";

/**
 * Custom bezier edge that arcs around intermediate nodes.
 * When source and target are on different Y positions, the curve bows out
 * vertically so it doesn't cut through nodes in between.
 */
function EdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps) {
  const isLearned = data?.sourceLearned && data?.targetLearned;
  const isActive = data?.sourceLearned && !data?.targetLearned;
  const accent = data?.accent || "#3b82f6";

  // Compute a custom bezier that avoids cutting through intermediate nodes
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const absDy = Math.abs(dy);

  // Horizontal control point offset: curves out more for longer distances
  const cpOffsetX = dx * 0.4;

  // Vertical bow: when source and target are at different Y levels,
  // push control points further in the Y direction so the curve arcs
  // away from the straight line (and thus away from intermediate nodes).
  // The more vertical distance, the more the curve bows outward.
  const bowStrength = Math.min(absDy * 0.3, 80);
  const bowDir = dy > 0 ? -1 : 1; // bow opposite to the Y direction

  const cp1x = sourceX + cpOffsetX;
  const cp1y = sourceY + bowDir * bowStrength;
  const cp2x = targetX - cpOffsetX;
  const cp2y = targetY + bowDir * bowStrength;

  const edgePath = `M ${sourceX} ${sourceY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;

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
