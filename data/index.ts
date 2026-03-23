import { scienceNodes } from "./sciences";
import { humanitiesNodes } from "./humanities";

export type NodeStatus = "locked" | "unlocked" | "learned";

export interface KnowledgeNode {
  id: string;
  title: string;
  domain: "sciences" | "humanities";
  era: number; // 1=Ancient, 2=Classical, 3=Medieval, 4=Renaissance, 5=Modern, 6=Contemporary
  description: string;
  whatToLearn: string[];
  resources: { label: string; url?: string }[];
  prerequisites: string[];
  icon: string;
  status: NodeStatus;
  userNotes: string;
  learnedAt?: string;
}

export const ERA_LABELS: Record<number, string> = {
  1: "Ancient Era",
  2: "Classical Era",
  3: "Medieval Era",
  4: "Renaissance Era",
  5: "Modern Era",
  6: "Contemporary Era",
};

/** Build a Record<id, node> from the seed data arrays. */
export function buildInitialNodes(): Record<string, KnowledgeNode> {
  const all = [...scienceNodes, ...humanitiesNodes];
  const record: Record<string, KnowledgeNode> = {};
  for (const node of all) {
    record[node.id] = node;
  }
  return record;
}

export { scienceNodes, humanitiesNodes };
