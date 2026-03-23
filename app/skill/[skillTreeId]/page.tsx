import { skillTrees, grandTrees } from "@/data";
import SkillTreeClient from "./SkillTreeClient";

export function generateStaticParams() {
  return skillTrees.map((s) => ({ skillTreeId: s.id }));
}

export default async function SkillTreePage({
  params,
}: {
  params: Promise<{ skillTreeId: string }>;
}) {
  const { skillTreeId } = await params;
  const skill = skillTrees.find((s) => s.id === skillTreeId);
  if (!skill) return <div>Not found</div>;

  // Find parent grand tree for back navigation
  const parentGrand = grandTrees.find((g) =>
    g.skillTrees?.includes(skill.id)
  );
  const backHref = parentGrand ? `/tree/${parentGrand.id}` : "/";

  return (
    <SkillTreeClient
      skillTreeId={skillTreeId}
      title={skill.title}
      accentColor={skill.color}
      backHref={backHref}
      sources={skill.sources}
    />
  );
}
