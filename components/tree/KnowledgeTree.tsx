"use client";

import { useMemo, useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  ConnectionMode,
  NodeTypes,
  EdgeTypes,
} from "reactflow";
import "reactflow/dist/style.css";

import { useKnowledgeStore } from "@/store/knowledgeStore";
import { KnowledgeNode, TIER_LABELS, SkillTreeSource } from "@/data/types";
import KnowledgeNodeComponent from "./KnowledgeNodeComponent";
import EdgeComponent from "./EdgeComponent";
import NodeDetailPanel from "./NodeDetailPanel";
import ProgressBar from "@/components/ui/ProgressBar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const nodeTypes: NodeTypes = {
  knowledge: KnowledgeNodeComponent,
};

const edgeTypes: EdgeTypes = {
  custom: EdgeComponent,
};

interface KnowledgeTreeProps {
  treeId: string;
  title: string;
  accentColor: string;
  backHref: string;
  sources?: SkillTreeSource[];
}

export default function KnowledgeTree({
  treeId,
  title,
  accentColor,
  backHref,
  sources,
}: KnowledgeTreeProps) {
  const storeNodes = useKnowledgeStore((s) => s.nodes);
  const getProgress = useKnowledgeStore((s) => s.getProgress);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const progress = getProgress(treeId);

  // Build source color map for skill tree badges
  const sourceColors = useMemo(() => {
    if (!sources) return {};
    const map: Record<string, string> = {};
    for (const s of sources) {
      map[s.branchId] = s.color;
    }
    return map;
  }, [sources]);

  const treeNodes = useMemo(() => {
    return Object.values(storeNodes).filter((n) => n.treeId === treeId);
  }, [storeNodes, treeId]);

  const handleNodeClick = useCallback((id: string) => {
    setSelectedNode(id);
  }, []);

  const { flowNodes, flowEdges } = useMemo(() => {
    // Group nodes by tier
    const byTier: Record<number, KnowledgeNode[]> = {};
    for (const node of treeNodes) {
      if (!byTier[node.tier]) byTier[node.tier] = [];
      byTier[node.tier].push(node);
    }

    const tiers = Object.keys(byTier)
      .map(Number)
      .sort((a, b) => a - b);

    const flowNodes: Node[] = [];
    const flowEdges: Edge[] = [];

    const TIER_SPACING = 300;
    const NODE_SPACING = 160;

    // Create tier label nodes and position knowledge nodes
    tiers.forEach((tier, tierIndex) => {
      const x = tierIndex * TIER_SPACING;
      const tierNodes = byTier[tier];
      const nodeCount = tierNodes.length;
      const startY = -(nodeCount - 1) * NODE_SPACING / 2 + 80;

      // Tier label
      flowNodes.push({
        id: `tier-label-${tier}`,
        type: "default",
        position: { x: x + 10, y: -60 },
        data: { label: TIER_LABELS[tier] || `Tier ${tier}` },
        selectable: false,
        draggable: false,
        style: {
          background: "transparent",
          border: "none",
          color: "#94a3b8",
          fontSize: "12px",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase" as const,
          width: "180px",
          textAlign: "center" as const,
        },
      });

      tierNodes.forEach((node, index) => {
        flowNodes.push({
          id: node.id,
          type: "knowledge",
          position: { x, y: startY + index * NODE_SPACING },
          data: {
            node,
            accentColor,
            onNodeClick: handleNodeClick,
            sourceColors: sources ? sourceColors : undefined,
          },
        });
      });
    });

    // Create edges from prerequisites (only within this tree's visible nodes)
    const treeNodeIds = new Set(treeNodes.map((n) => n.id));
    for (const node of treeNodes) {
      for (const preId of node.prerequisites) {
        // Only draw edges for prerequisites that are in this tree
        if (treeNodeIds.has(preId)) {
          const preNode = storeNodes[preId];
          if (preNode) {
            flowEdges.push({
              id: `${preId}-${node.id}`,
              source: preId,
              target: node.id,
              type: "custom",
              data: {
                sourceLearned: preNode.status === "learned",
                targetLearned: node.status === "learned",
                accent: accentColor,
              },
            });
          }
        }
      }
    }

    return { flowNodes, flowEdges };
  }, [treeNodes, storeNodes, accentColor, handleNodeClick, sources, sourceColors]);

  return (
    <div className="h-screen w-screen bg-babel-bg relative">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-babel-bg/80 backdrop-blur-sm border-b border-babel-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-full">
          <div className="flex items-center gap-3">
            <Link
              href={backHref}
              className="p-2 rounded-lg hover:bg-babel-surface text-babel-text-secondary hover:text-babel-text transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-heading text-lg font-bold text-babel-text">
                {title}
              </h1>
              <p className="text-xs text-babel-text-secondary">Knowledge Tree</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-babel-text-secondary">
              {progress.learned} / {progress.total} learned
            </span>
            <div className="w-32">
              <ProgressBar
                percent={progress.percent}
                color="bg-babel-learned"
              />
            </div>
            <span className="text-sm font-medium text-babel-text">
              {progress.percent}%
            </span>
          </div>
        </div>

        {/* Source legend for skill trees */}
        {sources && sources.length > 0 && (
          <div className="flex items-center gap-3 px-4 pb-2 flex-wrap">
            <span className="text-[10px] text-babel-text-secondary uppercase tracking-wider">
              Sources:
            </span>
            {sources.map((s) => (
              <div key={s.branchId} className="flex items-center gap-1">
                <div
                  className="w-2.5 h-2.5 rounded-full"
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

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.4, minZoom: 0.3, maxZoom: 1.2 }}
        minZoom={0.2}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
        zoomOnPinch
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1e2d45" gap={40} size={1} />
        <Controls
          showInteractive={false}
          position="bottom-left"
          style={{ marginBottom: "20px", marginLeft: "20px" }}
        />
      </ReactFlow>

      {/* Node Detail Panel */}
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
