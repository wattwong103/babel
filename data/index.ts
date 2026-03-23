// Re-export types
export type {
  KnowledgeNode,
  NodeStatus,
  GrandTree,
  BranchTree,
  SkillTree,
  SkillTreeSource,
  TreeTier,
} from "./types";
export { TIER_LABELS } from "./types";

// Grand trees
import { grandTrees } from "./grandTrees";
export { grandTrees };

// Branch trees
import { mathematics } from "./branches/mathematics";
import { logic } from "./branches/logic";
import { biology } from "./branches/biology";
import { geography } from "./branches/geography";
import { economics } from "./branches/economics";
import { politicalScience } from "./branches/political-science";
import { psychology } from "./branches/psychology";
import { philosophy } from "./branches/philosophy";

export const branchTrees = [
  mathematics,
  logic,
  biology,
  geography,
  economics,
  politicalScience,
  psychology,
  philosophy,
];

// Skill trees
import { transportationSciences } from "./skills/transportation-sciences";

export const skillTrees = [transportationSciences];

// Lookup helpers
import type { KnowledgeNode, BranchTree, SkillTree, GrandTree } from "./types";

export function getBranchTree(id: string): BranchTree | undefined {
  return branchTrees.find((b) => b.id === id);
}

export function getSkillTree(id: string): SkillTree | undefined {
  return skillTrees.find((s) => s.id === id);
}

export function getGrandTree(id: string): GrandTree | undefined {
  return grandTrees.find((g) => g.id === id);
}

export function getTreeNodes(treeId: string): KnowledgeNode[] {
  const branch = getBranchTree(treeId);
  if (branch) return branch.nodes;
  const skill = getSkillTree(treeId);
  if (skill) return skill.nodes;
  return [];
}

/** Build a Record<id, node> from all seed data. */
export function buildInitialNodes(): Record<string, KnowledgeNode> {
  const record: Record<string, KnowledgeNode> = {};
  for (const branch of branchTrees) {
    for (const node of branch.nodes) {
      record[node.id] = node;
    }
  }
  for (const skill of skillTrees) {
    for (const node of skill.nodes) {
      record[node.id] = node;
    }
  }
  return record;
}

/** Get all tree IDs (branches + skills). */
export function getAllTreeIds(): string[] {
  return [
    ...branchTrees.map((b) => b.id),
    ...skillTrees.map((s) => s.id),
  ];
}

/** Get branch IDs that feed into a skill tree. */
export function getSkillTreeSourceBranchIds(skillTreeId: string): string[] {
  const skill = getSkillTree(skillTreeId);
  if (!skill) return [];
  return skill.sources.map((s) => s.branchId);
}
