export type NodeStatus = "locked" | "unlocked" | "learned";
export type TreeTier = "grand" | "branch" | "skill";
export type NodeType = "knowledge" | "project";

export interface ProjectStep {
  id: string;
  label: string;
  completed: boolean;
}

export interface Deliverable {
  id: string;
  label: string;
  description: string;
  completed: boolean;
}

export interface GrandTree {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  branches: string[];
  skillTrees?: string[];
}

export interface BranchTree {
  id: string;
  title: string;
  description: string;
  icon: string;
  grandTreeId: string;
  color: string;
  nodes: KnowledgeNode[];
}

export interface SkillTree {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  sources: SkillTreeSource[];
  nodes: KnowledgeNode[];
}

export interface SkillTreeSource {
  branchId: string;
  label: string;
  color: string;
}

export interface KnowledgeNode {
  id: string;
  title: string;
  treeId: string;
  tier: number;
  description: string;
  whatToLearn: string[];
  resources: { label: string; url?: string }[];
  prerequisites: string[];
  icon: string;
  status: NodeStatus;
  userNotes: string;
  learnedAt?: string;
  sourceBranches?: string[];
  // Project-based learning fields
  nodeType?: NodeType;
  projectSteps?: ProjectStep[];
  deliverables?: Deliverable[];
  estimatedHours?: number;
  scenarioContext?: string;
}

export const TIER_LABELS: Record<number, string> = {
  1: "Foundations",
  2: "Core Concepts",
  3: "Analysis & Methods",
  4: "Advanced Topics",
  5: "Frontier",
};

export const PROJECT_TIER_LABELS: Record<number, string> = {
  1: "Project Setup",
  2: "Core Modeling",
  3: "Integration & Validation",
  4: "Analysis & Reporting",
};
