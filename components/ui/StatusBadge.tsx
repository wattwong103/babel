"use client";

import { Lock, Sparkles, Check } from "lucide-react";
import { NodeStatus } from "@/data/types";

interface StatusBadgeProps {
  status: NodeStatus;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const sizeClasses =
    size === "sm" ? "text-[11px] px-2 py-0.5" : "text-xs px-3 py-1";
  const iconSize = size === "sm" ? 10 : 14;
  const base = `inline-flex items-center gap-1.5 ${sizeClasses} rounded font-mono uppercase tracking-caps`;

  switch (status) {
    case "locked":
      return (
        <span
          className={`${base} text-babel-text-secondary`}
          style={{ backgroundColor: "rgba(143, 163, 188, 0.12)" }}
        >
          <Lock size={iconSize} />
          Locked
        </span>
      );
    case "unlocked":
      return (
        <span
          className={`${base}`}
          style={{ color: "#4f8dd6", backgroundColor: "rgba(79, 141, 214, 0.16)" }}
        >
          <Sparkles size={iconSize} />
          Unlocked
        </span>
      );
    case "learned":
      return (
        <span
          className={`${base}`}
          style={{ color: "#3fb985", backgroundColor: "rgba(63, 185, 133, 0.14)" }}
        >
          <Check size={iconSize} />
          Learned
        </span>
      );
  }
}
