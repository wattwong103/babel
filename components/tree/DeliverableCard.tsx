"use client";

import { Check, Package } from "lucide-react";
import type { Deliverable } from "@/data/types";

interface DeliverableCardProps {
  deliverable: Deliverable;
  accentColor: string;
  onToggle: () => void;
}

export default function DeliverableCard({
  deliverable,
  accentColor,
  onToggle,
}: DeliverableCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left p-3 rounded-lg border transition-all group ${
        deliverable.completed
          ? "border-emerald-500/30 bg-emerald-500/5"
          : "border-babel-border bg-babel-surface hover:border-babel-text-secondary/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-colors ${
            deliverable.completed
              ? "border-emerald-500 bg-emerald-500/20"
              : "border-babel-border group-hover:border-babel-text-secondary"
          }`}
        >
          {deliverable.completed ? (
            <Check size={12} className="text-emerald-400" />
          ) : (
            <Package size={10} className="text-babel-text-secondary" />
          )}
        </span>
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm font-medium transition-colors ${
              deliverable.completed
                ? "text-emerald-400 line-through"
                : "text-babel-text"
            }`}
          >
            {deliverable.label}
          </div>
          <div className="text-xs text-babel-text-secondary mt-0.5 leading-relaxed">
            {deliverable.description}
          </div>
        </div>
      </div>
    </button>
  );
}
