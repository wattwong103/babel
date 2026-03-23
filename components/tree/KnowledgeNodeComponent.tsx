"use client";

import { memo, useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Lock, Check } from "lucide-react";
import LucideIcon from "@/components/ui/LucideIcon";
import { KnowledgeNode, ERA_LABELS } from "@/data";
import { getMissingPrerequisites } from "@/lib/unlockEngine";
import { useKnowledgeStore } from "@/store/knowledgeStore";

interface KnowledgeNodeData {
  node: KnowledgeNode;
  onNodeClick: (id: string) => void;
}

function KnowledgeNodeComponent({ data }: NodeProps<KnowledgeNodeData>) {
  const { node, onNodeClick } = data;
  const nodes = useKnowledgeStore((s) => s.nodes);
  const [showTooltip, setShowTooltip] = useState(false);

  const isScience = node.domain === "sciences";
  const accent = isScience ? "#3b82f6" : "#a855f7";
  const accentLight = isScience ? "#60a5fa" : "#c084fc";

  const handleClick = useCallback(() => {
    if (node.status !== "locked") {
      onNodeClick(node.id);
    }
  }, [node.id, node.status, onNodeClick]);

  const missingPrereqs =
    node.status === "locked" ? getMissingPrerequisites(node.id, nodes) : [];

  return (
    <div
      className="relative"
      onMouseEnter={() => node.status === "locked" && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip for locked nodes */}
      {showTooltip && node.status === "locked" && missingPrereqs.length > 0 && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <div className="bg-gray-900 border border-babel-border rounded-lg px-3 py-2 text-xs max-w-[200px] shadow-xl">
            <p className="font-semibold text-babel-text-secondary mb-1 flex items-center gap-1">
              <Lock size={10} /> Locked
            </p>
            <p className="text-babel-text-secondary">
              Complete first:{" "}
              <span className="text-babel-text">
                {missingPrereqs.join(", ")}
              </span>
            </p>
          </div>
          <div className="w-2 h-2 bg-gray-900 border-r border-b border-babel-border rotate-45 mx-auto -mt-1" />
        </div>
      )}

      <div
        onClick={handleClick}
        className={`
          relative w-[160px] rounded-lg border p-3 transition-all duration-300
          ${
            node.status === "locked"
              ? "bg-babel-locked/30 border-babel-locked/50 cursor-default opacity-50 grayscale"
              : node.status === "unlocked"
              ? "bg-babel-surface border-babel-border cursor-pointer node-unlocked hover:scale-105"
              : "bg-babel-surface cursor-pointer hover:scale-105"
          }
        `}
        style={
          {
            "--glow-color": accent,
            borderColor:
              node.status === "learned"
                ? "#10b981"
                : node.status === "unlocked"
                ? accent
                : undefined,
            boxShadow:
              node.status === "learned"
                ? "0 0 12px rgba(16, 185, 129, 0.3)"
                : undefined,
          } as React.CSSProperties
        }
      >
        {/* Status overlay */}
        {node.status === "locked" && (
          <div className="absolute top-1 right-1">
            <Lock size={12} className="text-babel-text-secondary" />
          </div>
        )}
        {node.status === "learned" && (
          <div className="absolute top-1 right-1">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          </div>
        )}

        {/* Icon */}
        <div className="mb-2 flex items-center justify-center">
          <LucideIcon
            name={node.icon}
            size={24}
            style={{ color: node.status === "locked" ? "#374151" : accentLight }}
          />
        </div>

        {/* Title */}
        <p
          className={`text-xs font-heading font-semibold text-center leading-tight ${
            node.status === "locked"
              ? "text-babel-text-secondary"
              : "text-babel-text"
          }`}
        >
          {node.title}
        </p>

        {/* Era badge */}
        <div className="mt-2 flex justify-center">
          <span
            className="text-[9px] px-1.5 py-0.5 rounded-full bg-babel-border text-babel-text-secondary uppercase tracking-wider"
          >
            Era {node.era}
          </span>
        </div>
      </div>

      {/* React Flow handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-transparent !border-0 !w-2 !h-2"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !border-0 !w-2 !h-2"
      />
    </div>
  );
}

export default memo(KnowledgeNodeComponent);
