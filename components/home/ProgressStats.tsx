"use client";

import { useKnowledgeStore } from "@/store/knowledgeStore";
import ProgressBar from "@/components/ui/ProgressBar";

export default function ProgressStats() {
  const getTotalProgress = useKnowledgeStore((s) => s.getTotalProgress);
  const progress = getTotalProgress();

  return (
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
  );
}
