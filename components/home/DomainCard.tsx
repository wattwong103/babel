"use client";

import Link from "next/link";
import { FlaskConical, BookOpen, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { useKnowledgeStore } from "@/store/knowledgeStore";

interface DomainCardProps {
  domain: "sciences" | "humanities";
}

const domainConfig = {
  sciences: {
    title: "Sciences",
    description:
      "From ancient arithmetic to quantum mechanics — trace humanity's quest to understand the natural world through logic, mathematics, and experiment.",
    icon: FlaskConical,
    accent: "border-babel-science",
    accentBg: "bg-babel-science/10",
    accentText: "text-babel-science-light",
    progressColor: "bg-babel-science",
    glowColor: "#3b82f6",
  },
  humanities: {
    title: "Humanities & Philosophy",
    description:
      "From Pre-Socratic wonder to contemporary ethics — explore the deepest questions about mind, morality, meaning, and the human condition.",
    icon: BookOpen,
    accent: "border-babel-humanities",
    accentBg: "bg-babel-humanities/10",
    accentText: "text-babel-humanities-light",
    progressColor: "bg-babel-humanities",
    glowColor: "#a855f7",
  },
};

export default function DomainCard({ domain }: DomainCardProps) {
  const getProgress = useKnowledgeStore((s) => s.getProgress);
  const getRecentlyLearned = useKnowledgeStore((s) => s.getRecentlyLearned);
  const getNextUp = useKnowledgeStore((s) => s.getNextUp);

  const config = domainConfig[domain];
  const progress = getProgress(domain);
  const recentlyLearned = getRecentlyLearned(domain, 3);
  const nextUp = getNextUp(domain, 2);
  const Icon = config.icon;

  return (
    <div
      className={`group relative rounded-xl border ${config.accent} border-opacity-30 bg-babel-surface p-6 transition-all duration-300 hover:border-opacity-60`}
      style={
        {
          "--glow-color": config.glowColor,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`p-3 rounded-lg ${config.accentBg}`}
        >
          <Icon className={config.accentText} size={28} />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-babel-text">
            {config.title}
          </h2>
          <p className="text-sm text-babel-text-secondary">
            {progress.learned} / {progress.total} nodes learned
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-babel-text-secondary text-sm leading-relaxed mb-5">
        {config.description}
      </p>

      {/* Progress */}
      <div className="mb-5">
        <ProgressBar
          percent={progress.percent}
          color={config.progressColor}
          showLabel
        />
      </div>

      {/* Recently Learned */}
      {recentlyLearned.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-babel-text-secondary uppercase tracking-wider mb-2">
            Recently Learned
          </h3>
          <div className="space-y-1">
            {recentlyLearned.map((node) => (
              <div
                key={node.id}
                className="flex items-center gap-2 text-sm text-emerald-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {node.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Up */}
      {nextUp.length > 0 && (
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-babel-text-secondary uppercase tracking-wider mb-2">
            Next Up
          </h3>
          <div className="space-y-1">
            {nextUp.map((node) => (
              <div
                key={node.id}
                className={`flex items-center gap-2 text-sm ${config.accentText}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${config.progressColor}`}
                />
                {node.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <Link
        href={`/tree/${domain}`}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg ${config.accentBg} ${config.accentText} font-medium text-sm transition-all duration-200 hover:gap-3`}
      >
        Explore Tree
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
