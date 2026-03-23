import { grandTrees, branchTrees } from "@/data";
import BranchTreeClient from "./BranchTreeClient";

export function generateStaticParams() {
  const params: { grandTreeId: string; branchId: string }[] = [];
  for (const grand of grandTrees) {
    for (const branch of branchTrees) {
      if (branch.grandTreeId === grand.id) {
        params.push({ grandTreeId: grand.id, branchId: branch.id });
      }
    }
  }
  return params;
}

export default async function BranchTreePage({
  params,
}: {
  params: Promise<{ grandTreeId: string; branchId: string }>;
}) {
  const { grandTreeId, branchId } = await params;
  const branch = branchTrees.find((b) => b.id === branchId);
  if (!branch) return <div>Not found</div>;

  return (
    <BranchTreeClient
      branchId={branchId}
      title={branch.title}
      accentColor={branch.color}
      backHref={`/tree/${grandTreeId}`}
    />
  );
}
