"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { KnowledgeNode, buildInitialNodes } from "@/data";
import { computeUnlockStates } from "@/lib/unlockEngine";

interface KnowledgeStore {
  nodes: Record<string, KnowledgeNode>;
  markAsLearned: (id: string) => void;
  unmarkAsLearned: (id: string) => void;
  updateNotes: (id: string, notes: string) => void;
  getUnlockedNodes: (domain: string) => KnowledgeNode[];
  getProgress: (domain: string) => {
    learned: number;
    total: number;
    percent: number;
  };
  getTotalProgress: () => { learned: number; total: number; percent: number };
  getRecentlyLearned: (domain: string, count?: number) => KnowledgeNode[];
  getNextUp: (domain: string, count?: number) => KnowledgeNode[];
}

export const useKnowledgeStore = create<KnowledgeStore>()(
  persist(
    (set, get) => ({
      nodes: buildInitialNodes(),

      markAsLearned: (id: string) => {
        set((state) => {
          const node = state.nodes[id];
          if (!node || node.status === "locked") return state;
          const updated = {
            ...state.nodes,
            [id]: {
              ...node,
              status: "learned" as const,
              learnedAt: new Date().toISOString(),
            },
          };
          return { nodes: computeUnlockStates(updated) };
        });
      },

      unmarkAsLearned: (id: string) => {
        set((state) => {
          const node = state.nodes[id];
          if (!node || node.status !== "learned") return state;
          const updated = {
            ...state.nodes,
            [id]: {
              ...node,
              status: "unlocked" as const,
              learnedAt: undefined,
            },
          };
          return { nodes: computeUnlockStates(updated) };
        });
      },

      updateNotes: (id: string, notes: string) => {
        set((state) => {
          const node = state.nodes[id];
          if (!node) return state;
          return {
            nodes: {
              ...state.nodes,
              [id]: { ...node, userNotes: notes },
            },
          };
        });
      },

      getUnlockedNodes: (domain: string) => {
        const { nodes } = get();
        return Object.values(nodes).filter(
          (n) => n.domain === domain && n.status === "unlocked"
        );
      },

      getProgress: (domain: string) => {
        const { nodes } = get();
        const domainNodes = Object.values(nodes).filter(
          (n) => n.domain === domain
        );
        const learned = domainNodes.filter(
          (n) => n.status === "learned"
        ).length;
        const total = domainNodes.length;
        return {
          learned,
          total,
          percent: total === 0 ? 0 : Math.round((learned / total) * 100),
        };
      },

      getTotalProgress: () => {
        const { nodes } = get();
        const all = Object.values(nodes);
        const learned = all.filter((n) => n.status === "learned").length;
        const total = all.length;
        return {
          learned,
          total,
          percent: total === 0 ? 0 : Math.round((learned / total) * 100),
        };
      },

      getRecentlyLearned: (domain: string, count = 3) => {
        const { nodes } = get();
        return Object.values(nodes)
          .filter(
            (n) => n.domain === domain && n.status === "learned" && n.learnedAt
          )
          .sort(
            (a, b) =>
              new Date(b.learnedAt!).getTime() -
              new Date(a.learnedAt!).getTime()
          )
          .slice(0, count);
      },

      getNextUp: (domain: string, count = 2) => {
        const { nodes } = get();
        return Object.values(nodes)
          .filter((n) => n.domain === domain && n.status === "unlocked")
          .sort((a, b) => a.era - b.era)
          .slice(0, count);
      },
    }),
    {
      name: "babel-knowledge-store",
      // On rehydration, recompute unlock states and merge with seed data
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== "object") return current;
        const persistedState = persisted as Partial<KnowledgeStore>;
        const seedNodes = buildInitialNodes();
        const savedNodes = persistedState.nodes || {};

        // Merge: use seed data as base, overlay saved user state (notes, status, learnedAt)
        const merged: Record<string, KnowledgeNode> = {};
        for (const [id, seedNode] of Object.entries(seedNodes)) {
          const saved = savedNodes[id];
          if (saved) {
            merged[id] = {
              ...seedNode,
              status: saved.status,
              userNotes: saved.userNotes || "",
              learnedAt: saved.learnedAt,
            };
          } else {
            merged[id] = seedNode;
          }
        }

        return {
          ...current,
          nodes: computeUnlockStates(merged),
        };
      },
    }
  )
);
