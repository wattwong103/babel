import { KnowledgeNode, NodeStatus } from "@/data/types";

/**
 * Recomputes the lock/unlock status of all nodes based on the current learned set.
 * A node is unlocked if ALL its prerequisites are 'learned'.
 * Nodes with no prerequisites start as 'unlocked'.
 * Already-learned nodes stay 'learned'.
 * Prerequisites can reference nodes from ANY tree (cross-tree support).
 */
export function computeUnlockStates(
  nodes: Record<string, KnowledgeNode>
): Record<string, KnowledgeNode> {
  const updated: Record<string, KnowledgeNode> = {};

  for (const [id, node] of Object.entries(nodes)) {
    if (node.status === "learned") {
      updated[id] = node;
      continue;
    }

    const allPrereqsLearned =
      node.prerequisites.length === 0 ||
      node.prerequisites.every((preId) => nodes[preId]?.status === "learned");

    const newStatus: NodeStatus = allPrereqsLearned ? "unlocked" : "locked";
    updated[id] = { ...node, status: newStatus };
  }

  return updated;
}

/**
 * Returns an array of prerequisite node titles that are not yet learned.
 */
export function getMissingPrerequisites(
  nodeId: string,
  nodes: Record<string, KnowledgeNode>
): string[] {
  const node = nodes[nodeId];
  if (!node) return [];

  return node.prerequisites
    .filter((preId) => nodes[preId]?.status !== "learned")
    .map((preId) => nodes[preId]?.title ?? preId);
}
