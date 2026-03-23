"use client";

import { useMemo, useState } from "react";
import { useKnowledgeStore } from "@/store/knowledgeStore";
import { KnowledgeNode, ERA_LABELS } from "@/data";
import LucideIcon from "@/components/ui/LucideIcon";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";
import NodeDetailPanel from "./NodeDetailPanel";
import { ArrowLeft, Lock, Check, Sparkles } from "lucide-react";
import Link from "next/link";

interface MobileTreeViewProps {
  domain: "sciences" | "humanities";
}

export default function MobileTreeView({ domain }: MobileTreeViewProps) {
  const storeNodes = useKnowledgeStore((s) => s.nodes);
  const getProgress = useKnowledgeStore((s) => s.getProgress);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const progress = getProgress(domain);
  const isScience = domain === "sciences";
  const accentColor = isScience ? "#3b82f6" : "#a855f7";
  const progressColor = isScience ? "bg-babel-science" : "bg-babel-humanities";

  const nodesByEra = useMemo(() => {
    const domainNodes = Object.values(storeNodes).filter(
      (n) => n.domain === domain
    );
    const byEra: Record<number, KnowledgeNode[]> = {};
    for (const node of domainNodes) {
      if (!byEra[node.era]) byEra[node.era] = [];
      byEra[node.era].push(node);
    }
    return byEra;
  }, [storeNodes, domain]);

  return (
    <div className="min-h-screen bg-babel-bg">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-babel-bg/90 backdrop-blur-sm border-b border-babel-border px-4 py-3">
        <div className="flex items-center gap-3 mb-2">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-babel-surface text-babel-text-secondary"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-heading text-lg font-bold text-babel-text">
            {domain === "sciences" ? "Sciences" : "Humanities & Philosophy"}
          </h1>
        </div>
        <div className="flex items-center gap-2 ml-10">
          <div className="flex-1">
            <ProgressBar percent={progress.percent} color={progressColor} />
          </div>
          <span className="text-xs text-babel-text-secondary whitespace-nowrap">
            {progress.learned}/{progress.total} — {progress.percent}%
          </span>
        </div>
      </div>

      {/* Nodes by Era */}
      <div className="px-4 py-6 space-y-8">
        {Object.entries(nodesByEra)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([era, nodes]) => (
            <div key={era}>
              <h2 className="font-heading text-sm font-semibold text-babel-text-secondary uppercase tracking-wider mb-3">
                {ERA_LABELS[parseInt(era)]}
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
                      {node.status === "locked" && (
                        <Lock size={14} className="text-babel-text-secondary" />
                      )}
                      {node.status === "unlocked" && (
                        <Sparkles
                          size={14}
                          style={{ color: accentColor }}
                        />
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
        />
      )}
    </div>
  );
}
