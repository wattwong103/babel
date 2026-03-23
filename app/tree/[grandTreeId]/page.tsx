import { grandTrees, branchTrees, skillTrees } from "@/data";
import GrandTreeOverview from "./GrandTreeOverview";

export function generateStaticParams() {
  return grandTrees.map((g) => ({ grandTreeId: g.id }));
}

export default async function GrandTreePage({
  params,
}: {
  params: Promise<{ grandTreeId: string }>;
}) {
  const { grandTreeId } = await params;
  const grandTree = grandTrees.find((g) => g.id === grandTreeId);
  if (!grandTree) return <div>Not found</div>;

  const branches = branchTrees.filter((b) => b.grandTreeId === grandTreeId);
  const skills = skillTrees.filter((s) =>
    grandTree.skillTrees?.includes(s.id)
  );

  return (
    <GrandTreeOverview
      grandTree={grandTree}
      branches={branches}
      skills={skills}
    />
  );
}
