"use client";

import { Check } from "lucide-react";
import type { ProjectStep } from "@/data/types";

interface ProjectStepChecklistProps {
  steps: ProjectStep[];
  accentColor: string;
  onToggle: (stepId: string) => void;
}

export default function ProjectStepChecklist({
  steps,
  accentColor,
  onToggle,
}: ProjectStepChecklistProps) {
  const completed = steps.filter((s) => s.completed).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-lg font-semibold text-babel-text">
          Project Steps
        </h3>
        <span
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{
            backgroundColor: accentColor + "15",
            color: accentColor,
          }}
        >
          {completed}/{steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-babel-surface rounded-full mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(completed / steps.length) * 100}%`,
            backgroundColor: accentColor,
          }}
        />
      </div>

      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={step.id}>
            <button
              onClick={() => onToggle(step.id)}
              className="flex items-start gap-3 w-full text-left p-2 rounded-lg hover:bg-babel-surface/50 transition-colors group"
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-colors ${
                  step.completed
                    ? "border-emerald-500 bg-emerald-500/20"
                    : "border-babel-border group-hover:border-babel-text-secondary"
                }`}
              >
                {step.completed && (
                  <Check size={12} className="text-emerald-400" />
                )}
              </span>
              <span
                className={`text-sm leading-relaxed transition-colors ${
                  step.completed
                    ? "text-babel-text-secondary line-through"
                    : "text-babel-text"
                }`}
              >
                <span
                  className="text-xs font-medium mr-1.5"
                  style={{ color: step.completed ? undefined : accentColor }}
                >
                  {i + 1}.
                </span>
                {step.label}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
