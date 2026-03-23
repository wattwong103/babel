"use client";

import { GrandTree, BranchTree, SkillTree } from "@/data/types";
import { useKnowledgeStore } from "@/store/knowledgeStore";
import LucideIcon from "@/components/ui/LucideIcon";
import ProgressBar from "@/components/ui/ProgressBar";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  grandTree: GrandTree;
  branches: BranchTree[];
  skills: SkillTree[];
}

export default function GrandTreeOverview({
  grandTree,
  branches,
  skills,
}: Props) {
  const getProgress = useKnowledgeStore((s) => s.getProgress);

  return (
    <main className="min-h-screen bg-babel-bg">
      {/* Header */}
      <div className="border-b border-babel-border bg-babel-bg/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-babel-surface text-babel-text-secondary hover:text-babel-text transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: grandTree.color + "15" }}
            >
              <LucideIcon
                name={grandTree.icon}
                size={24}
                style={{ color: grandTree.color }}
              />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-babel-text">
                {grandTree.title}
              </h1>
              <p className="text-sm text-babel-text-secondary">
                {grandTree.description.split(".")[0]}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Branch Trees */}
        {branches.length > 0 && (
          <div className="mb-10">
            <h2 className="font-heading text-lg font-semibold text-babel-text mb-4">
              Branch Trees
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {branches.map((branch) => {
                const progress = getProgress(branch.id);
                return (
                  <Link
                    key={branch.id}
                    href={`/tree/${grandTree.id}/${branch.id}`}
                    className="group flex items-center gap-4 rounded-xl border border-babel-border bg-babel-surface p-5 transition-all duration-300 hover:scale-[1.02]"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = branch.color + "60";
                      e.currentTarget.style.boxShadow = `0 0 20px ${branch.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: branch.color + "15" }}
                    >
                      <LucideIcon
                        name={branch.icon}
                        size={28}
                        style={{ color: branch.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-bold text-babel-text mb-1">
                        {branch.title}
                      </h3>
                      <p className="text-xs text-babel-text-secondary mb-2 line-clamp-2">
                        {branch.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <ProgressBar
                            percent={progress.percent}
                            color="bg-babel-learned"
                          />
                        </div>
                        <span className="text-[10px] text-babel-text-secondary whitespace-nowrap">
                          {progress.learned}/{progress.total}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-babel-text-secondary group-hover:text-babel-text transition-colors flex-shrink-0"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Skill Trees */}
        {skills.length > 0 && (
          <div>
            <h2 className="font-heading text-lg font-semibold text-babel-text mb-4">
              Skill Trees
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill) => {
                const progress = getProgress(skill.id);
                return (
                  <Link
                    key={skill.id}
                    href={`/skill/${skill.id}`}
                    className="group flex items-center gap-4 rounded-xl border border-babel-border bg-babel-surface p-5 transition-all duration-300 hover:scale-[1.02]"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = skill.color + "60";
                      e.currentTarget.style.boxShadow = `0 0 20px ${skill.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: skill.color + "15" }}
                    >
                      <LucideIcon
                        name={skill.icon}
                        size={28}
                        style={{ color: skill.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-bold text-babel-text mb-1">
                        {skill.title}
                      </h3>
                      <p className="text-xs text-babel-text-secondary mb-2 line-clamp-2">
                        {skill.description}
                      </p>
                      {/* Source badges */}
                      <div className="flex items-center gap-1.5 mb-2">
                        {skill.sources.map((s) => (
                          <div
                            key={s.branchId}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: s.color }}
                            title={s.label}
                          />
                        ))}
                        <span className="text-[10px] text-babel-text-secondary ml-1">
                          {skill.sources.length} source branches
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <ProgressBar
                            percent={progress.percent}
                            color="bg-babel-learned"
                          />
                        </div>
                        <span className="text-[10px] text-babel-text-secondary whitespace-nowrap">
                          {progress.learned}/{progress.total}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-babel-text-secondary group-hover:text-babel-text transition-colors flex-shrink-0"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
