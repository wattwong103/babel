"use client";

import { grandTrees, branchTrees, skillTrees } from "@/data";
import { useKnowledgeStore } from "@/store/knowledgeStore";
import LucideIcon from "@/components/ui/LucideIcon";
import ProgressBar from "@/components/ui/ProgressBar";
import Link from "next/link";

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/favicon.svg"
        alt=""
        width={28}
        height={28}
        className="rounded-md"
      />
      <span className="font-display text-lg font-medium text-babel-text tracking-tight">
        Babel<span className="text-accent">.</span>
      </span>
    </Link>
  );
}

function GrandTreeCard({ tree }: { tree: (typeof grandTrees)[0] }) {
  const getProgress = useKnowledgeStore((s) => s.getProgress);

  // Aggregate progress across all branch trees in this grand tree
  const branches = branchTrees.filter((b) => b.grandTreeId === tree.id);
  const skills = skillTrees.filter((s) => tree.skillTrees?.includes(s.id));

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
      className={`group block rounded-[10px] border border-babel-border bg-babel-surface p-6 transition-all duration-200 ${
        hasTrees
          ? "hover:-translate-y-0.5 hover:shadow-brand-md cursor-pointer"
          : "opacity-50 cursor-default"
      }`}
      onMouseEnter={(e) => {
        if (hasTrees) {
          e.currentTarget.style.borderColor = tree.color + "80";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="p-3 rounded-[10px]"
          style={{ backgroundColor: tree.color + "1f" }}
        >
          <LucideIcon name={tree.icon} size={26} style={{ color: tree.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-xl font-medium text-babel-text mb-1 tracking-tight">
            {tree.title}
          </h2>
          {totalNodes > 0 && (
            <span className="font-mono text-xs text-babel-text-secondary">
              {totalLearned} / {totalNodes} nodes learned
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-babel-text-secondary leading-relaxed mb-5">
        {tree.description}
      </p>

      {totalNodes > 0 && (
        <div className="mb-4">
          <ProgressBar percent={percent} color="bg-babel-learned" />
        </div>
      )}

      {/* Branch / Skill previews */}
      <div className="flex flex-wrap gap-1.5">
        {branches.map((b) => (
          <span
            key={b.id}
            className="font-mono text-[11px] px-2 py-0.5 rounded border border-babel-border text-babel-text-secondary"
          >
            {b.title}
          </span>
        ))}
        {skills.map((s) => (
          <span
            key={s.id}
            className="font-mono text-[11px] px-2 py-0.5 rounded border text-babel-text-secondary"
            style={{ borderColor: s.color + "55", color: s.color }}
          >
            {s.title}
          </span>
        ))}
        {!hasTrees && (
          <span className="font-mono text-[11px] text-babel-text-secondary">
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
      {/* Sticky nav */}
      <header className="sticky top-0 z-20 border-b border-babel-border bg-babel-bg/[0.92] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3.5">
          <BrandMark />
          <span className="font-mono text-xs text-babel-text-secondary hidden sm:inline">
            Knowledge technology tree
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[930px] px-6 pt-20 pb-14 text-center">
        <p className="eyebrow mb-5">A tower of knowledge</p>
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-babel-text tracking-tight mb-5">
          BABEL
        </h1>
        <p className="mx-auto max-w-xl text-base sm:text-lg text-babel-text-secondary leading-relaxed">
          Build your tower of knowledge, one discovery at a time — a research
          map across the formal, natural, social, and applied sciences.
        </p>
      </section>

      {/* Overall progress */}
      <section className="mx-auto max-w-[930px] px-6 pb-14">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-4 rounded-[10px] border border-babel-border bg-babel-surface px-6 py-3">
            <span className="eyebrow !text-babel-text-secondary">
              Total progress
            </span>
            <div className="w-32">
              <ProgressBar percent={progress.percent} color="bg-babel-learned" />
            </div>
            <span className="font-mono text-sm text-babel-text">
              {progress.learned} / {progress.total} nodes
            </span>
          </div>
        </div>
      </section>

      {/* Section label */}
      <section className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-baseline justify-between border-b border-babel-border pb-3 mb-8">
          <h2 className="font-display text-lg font-medium text-babel-text tracking-tight">
            Grand trees
          </h2>
          <span className="font-mono text-xs text-babel-text-secondary">
            {grandTrees.length} domains
          </span>
        </div>
      </section>

      {/* Grand tree cards */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grandTrees.map((tree) => (
            <GrandTreeCard key={tree.id} tree={tree} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-babel-border py-8 text-center">
        <p className="font-mono text-xs text-babel-text-secondary">
          Babel · A knowledge technology tree · W.Wongkaew
        </p>
      </footer>
    </main>
  );
}
