"use client";

import { Lock, Sparkles, Check } from "lucide-react";
import { NodeStatus } from "@/data";

interface StatusBadgeProps {
  status: NodeStatus;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";
  const iconSize = size === "sm" ? 10 : 14;

  switch (status) {
    case "locked":
      return (
        <span
          className={`inline-flex items-center gap-1 ${sizeClasses} rounded-full bg-babel-locked/50 text-babel-text-secondary`}
        >
          <Lock size={iconSize} />
          Locked
        </span>
      );
    case "unlocked":
      return (
        <span
          className={`inline-flex items-center gap-1 ${sizeClasses} rounded-full bg-blue-500/20 text-blue-400`}
        >
          <Sparkles size={iconSize} />
          Unlocked
        </span>
      );
    case "learned":
      return (
        <span
          className={`inline-flex items-center gap-1 ${sizeClasses} rounded-full bg-emerald-500/20 text-emerald-400`}
        >
          <Check size={iconSize} />
          Learned
        </span>
      );
  }
}
