"use client";

import { useMemo, useState } from "react";
import { useKnowledgeStore } from "@/store/knowledgeStore";
import { KnowledgeNode, TIER_LABELS, SkillTreeSource } from "@/data/types";
import LucideIcon from "@/components/ui/LucideIcon";
import ProgressBar from "@/components/ui/ProgressBar";
import NodeDetailPanel from "./NodeDetailPanel";
import { ArrowLeft, Lock, Check, Sparkles } from "lucide-react";
import Link from "next/link";

interface MobileTreeViewProps {
  treeId: string;
  title: string;
  accentColor: string;
  backHref: string;
  sources?: SkillTreeSource[];
}

export default function MobileTreeView({
  treeId,
  title,
  accentColor,
  backHref,
  sources,
}: MobileTreeViewProps) {
  const storeNodes = useKnowledgeStore((s) => s.nodes);
  const getProgress = useKnowledgeStore((s) => s.getProgress);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const progress = getProgress(treeId);

  const sourceColors = useMemo(() => {
    if (!sources) return {};
    const map: Record<string, string> = {};
    for (const s of sources) {
      map[s.branchId] = s.color;
    }
    return map;
  }, [sources]);

  const nodesByTier = useMemo(() => {
    const treeNodes = Object.values(storeNodes).filter(
      (n) => n.treeId === treeId
    );
    const byTier: Record<number, KnowledgeNode[]> = {};
    for (const node of treeNodes) {
      if (!byTier[node.tier]) byTier[node.tier] = [];
      byTier[node.tier].push(node);
    }
    return byTier;
  }, [storeNodes, treeId]);

  return (
    <div className="min-h-screen bg-babel-bg">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-babel-bg/90 backdrop-blur-sm border-b border-babel-border px-4 py-3">
        <div className="flex items-center gap-3 mb-2">
          <Link
            href={backHref}
            className="p-2 rounded-lg hover:bg-babel-surface text-babel-text-secondary"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-heading text-lg font-bold text-babel-text">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-2 ml-10">
          <div className="flex-1">
            <ProgressBar percent={progress.percent} color="bg-babel-learned" />
          </div>
          <span className="text-xs text-babel-text-secondary whitespace-nowrap">
            {progress.learned}/{progress.total} — {progress.percent}%
          </span>
        </div>
        {/* Source legend */}
        {sources && sources.length > 0 && (
          <div className="flex items-center gap-2 ml-10 mt-2 flex-wrap">
            {sources.map((s) => (
              <div key={s.branchId} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-[10px] text-babel-text-secondary">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nodes by Tier */}
      <div className="px-4 py-6 space-y-8">
        {Object.entries(nodesByTier)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([tier, nodes]) => (
            <div key={tier}>
              <h2 className="font-heading text-sm font-semibold text-babel-text-secondary uppercase tracking-wider mb-3">
                {TIER_LABELS[parseInt(tier)] || `Tier ${tier}`}
              </h2>
              <div className="space-y-2">
                {nodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() =>
                      node.status !== "locked" && setSelectedNode(node.id)
                    }
                    className={`w-full text-left rounded-lg border p-3 transition-all ${
                      node.status === "locked"
                        ? "bg-babel-locked/20 border-babel-locked/30 opacity-60"
                        : node.status === "learned"
                        ? "bg-babel-surface border-emerald-500/30"
                        : "bg-babel-surface border-babel-border"
                    }`}
                    style={
                      node.status === "unlocked"
                        ? {
                            borderColor: accentColor + "60",
                            boxShadow: `0 0 8px ${accentColor}20`,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3">
                      <LucideIcon
                        name={node.icon}
                        size={20}
                        style={{
                          color:
                            node.status === "locked"
                              ? "#374151"
                              : node.status === "learned"
                              ? "#10b981"
                              : accentColor,
                        }}
                      />
                      <span
                        className={`flex-1 text-sm font-medium ${
                          node.status === "locked"
                            ? "text-babel-text-secondary"
                            : "text-babel-text"
                        }`}
                      >
                        {node.title}
                      </span>
                      {/* Source badges */}
                      {node.sourceBranches &&
                        node.sourceBranches.map((b) =>
                          sourceColors[b] ? (
                            <div
                              key={b}
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: sourceColors[b] }}
                            />
                          ) : null
                        )}
                      {node.status === "locked" && (
                        <Lock size={14} className="text-babel-text-secondary" />
                      )}
                      {node.status === "unlocked" && (
                        <Sparkles size={14} style={{ color: accentColor }} />
                      )}
                      {node.status === "learned" && (
                        <Check size={14} className="text-emerald-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Detail Panel */}
      {selectedNode && (
        <NodeDetailPanel
          nodeId={selectedNode}
          onClose={() => setSelectedNode(null)}
          accentColor={accentColor}
          sourceColors={sourceColors}
        />
      )}
    </div>
  );
}
