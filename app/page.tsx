"use client";

import { grandTrees, branchTrees, skillTrees } from "@/data";
import { useKnowledgeStore } from "@/store/knowledgeStore";
import LucideIcon from "@/components/ui/LucideIcon";
import ProgressBar from "@/components/ui/ProgressBar";
import Link from "next/link";

function GrandTreeCard({ tree }: { tree: (typeof grandTrees)[0] }) {
  const getProgress = useKnowledgeStore((s) => s.getProgress);

  // Aggregate progress across all branch trees in this grand tree
  const branches = branchTrees.filter((b) => b.grandTreeId === tree.id);
  const skills = skillTrees.filter((s) =>
    tree.skillTrees?.includes(s.id)
  );

  let totalLearned = 0;
  let totalNodes = 0;
  for (const b of branches) {
    const p = getProgress(b.id);
    totalLearned += p.learned;
    totalNodes += p.total;
  }
  for (const s of skills) {
    const p = getProgress(s.id);
    totalLearned += p.learned;
    totalNodes += p.total;
  }
  const percent =
    totalNodes === 0 ? 0 : Math.round((totalLearned / totalNodes) * 100);

  const hasTrees = branches.length > 0 || skills.length > 0;

  return (
    <Link
      href={hasTrees ? `/tree/${tree.id}` : "#"}
      className={`group block rounded-xl border border-babel-border bg-babel-surface p-6 transition-all duration-300 ${
        hasTrees
          ? "hover:border-opacity-60 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
          : "opacity-50 cursor-default"
      }`}
      style={
        hasTrees
          ? ({
              "--hover-border": tree.color,
            } as React.CSSProperties)
          : undefined
      }
      onMouseEnter={(e) => {
        if (hasTrees) {
          e.currentTarget.style.borderColor = tree.color + "60";
          e.currentTarget.style.boxShadow = `0 0 24px ${tree.color}15`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: tree.color + "15" }}
        >
          <LucideIcon
            name={tree.icon}
            size={28}
            style={{ color: tree.color }}
          />
        </div>
        <div className="flex-1">
          <h2 className="font-heading text-xl font-bold text-babel-text mb-1">
            {tree.title}
          </h2>
          {totalNodes > 0 && (
            <span className="text-xs text-babel-text-secondary">
              {totalLearned} / {totalNodes} nodes learned
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-babel-text-secondary leading-relaxed mb-4">
        {tree.description}
      </p>

      {totalNodes > 0 && (
        <div className="mb-3">
          <ProgressBar percent={percent} color="bg-babel-learned" />
        </div>
      )}

      {/* Branch/Skill previews */}
      <div className="flex flex-wrap gap-1.5">
        {branches.map((b) => (
          <span
            key={b.id}
            className="text-[10px] px-2 py-0.5 rounded-full border border-babel-border text-babel-text-secondary"
          >
            {b.title}
          </span>
        ))}
        {skills.map((s) => (
          <span
            key={s.id}
            className="text-[10px] px-2 py-0.5 rounded-full border text-babel-text-secondary"
            style={{ borderColor: s.color + "40", color: s.color }}
          >
            {s.title}
          </span>
        ))}
        {!hasTrees && (
          <span className="text-[10px] text-babel-text-secondary italic">
            Coming soon
          </span>
        )}
      </div>
    </Link>
  );
}

export default function HomePage() {
  const getTotalProgress = useKnowledgeStore((s) => s.getTotalProgress);
  const progress = getTotalProgress();

  return (
    <main className="min-h-screen bg-babel-bg">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="font-heading text-7xl sm:text-8xl md:text-9xl font-black text-babel-text tracking-tight mb-4">
            BABEL
          </h1>
          <p className="text-lg sm:text-xl text-babel-text-secondary max-w-md mx-auto font-light">
            Build your tower of knowledge, one discovery at a time.
          </p>
        </div>
      </section>

      {/* Overall Progress */}
      <section className="pb-12 px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-babel-surface border border-babel-border rounded-full px-6 py-3">
            <div className="text-sm text-babel-text-secondary">
              Total Progress
            </div>
            <div className="w-32">
              <ProgressBar percent={progress.percent} color="bg-babel-learned" />
            </div>
            <div className="text-sm font-medium text-babel-text">
              {progress.learned} / {progress.total} nodes
            </div>
          </div>
        </div>
      </section>

      {/* Grand Tree Cards */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grandTrees.map((tree) => (
            <GrandTreeCard key={tree.id} tree={tree} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-babel-border py-6 text-center">
        <p className="text-xs text-babel-text-secondary">
          Babel — A Knowledge Technology Tree
        </p>
      </footer>
    </main>
  );
}
