"use client";

import { useMemo, useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  NodeTypes,
  EdgeTypes,
} from "reactflow";
import "reactflow/dist/style.css";

import { useKnowledgeStore } from "@/store/knowledgeStore";
import { KnowledgeNode, ERA_LABELS } from "@/data";
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

const ERA_X_POSITIONS: Record<number, number> = {
  1: 0,
  2: 280,
  3: 560,
  4: 840,
  5: 1120,
  6: 1400,
};

interface KnowledgeTreeProps {
  domain: "sciences" | "humanities";
}

export default function KnowledgeTree({ domain }: KnowledgeTreeProps) {
  const storeNodes = useKnowledgeStore((s) => s.nodes);
  const getProgress = useKnowledgeStore((s) => s.getProgress);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const progress = getProgress(domain);
  const isScience = domain === "sciences";
  const accent = isScience ? "#3b82f6" : "#a855f7";
  const progressColor = isScience ? "bg-babel-science" : "bg-babel-humanities";

  const domainNodes = useMemo(() => {
    return Object.values(storeNodes).filter((n) => n.domain === domain);
  }, [storeNodes, domain]);

  const handleNodeClick = useCallback((id: string) => {
    setSelectedNode(id);
  }, []);

  // Build React Flow nodes, positioning by era columns
  const { flowNodes, flowEdges } = useMemo(() => {
    // Group nodes by era
    const byEra: Record<number, KnowledgeNode[]> = {};
    for (const node of domainNodes) {
      if (!byEra[node.era]) byEra[node.era] = [];
      byEra[node.era].push(node);
    }

    const flowNodes: Node[] = [];
    const flowEdges: Edge[] = [];

    // Create era label nodes
    for (let era = 1; era <= 6; era++) {
      if (byEra[era]) {
        flowNodes.push({
          id: `era-label-${era}`,
          type: "default",
          position: { x: ERA_X_POSITIONS[era] + 20, y: -60 },
          data: { label: ERA_LABELS[era] },
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
            width: "160px",
            textAlign: "center" as const,
          },
        });
      }
    }

    // Position knowledge nodes
    for (const [era, eraNodes] of Object.entries(byEra)) {
      const eraNum = parseInt(era);
      const x = ERA_X_POSITIONS[eraNum];
      const nodeCount = eraNodes.length;
      const spacing = 140;
      const startY = -(nodeCount - 1) * spacing / 2 + 60;

      eraNodes.forEach((node, index) => {
        flowNodes.push({
          id: node.id,
          type: "knowledge",
          position: { x, y: startY + index * spacing },
          data: { node, onNodeClick: handleNodeClick },
        });
      });
    }

    // Create edges from prerequisites
    for (const node of domainNodes) {
      for (const preId of node.prerequisites) {
        const preNode = storeNodes[preId];
        if (preNode && preNode.domain === domain) {
          flowEdges.push({
            id: `${preId}-${node.id}`,
            source: preId,
            target: node.id,
            type: "custom",
            data: {
              sourceLearned: preNode.status === "learned",
              targetLearned: node.status === "learned",
              accent,
            },
          });
        }
      }
    }

    return { flowNodes, flowEdges };
  }, [domainNodes, storeNodes, domain, accent, handleNodeClick]);

  return (
    <div className="h-screen w-screen bg-babel-bg relative">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-babel-bg/80 backdrop-blur-sm border-b border-babel-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-full">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-babel-surface text-babel-text-secondary hover:text-babel-text transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-heading text-lg font-bold text-babel-text">
                {domain === "sciences" ? "Sciences" : "Humanities & Philosophy"}
              </h1>
              <p className="text-xs text-babel-text-secondary">Knowledge Tree</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-babel-text-secondary">
              {progress.learned} / {progress.total} learned
            </span>
            <div className="w-32">
              <ProgressBar percent={progress.percent} color={progressColor} />
            </div>
            <span className="text-sm font-medium text-babel-text">
              {progress.percent}%
            </span>
          </div>
        </div>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
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
        />
      )}
    </div>
  );
}
