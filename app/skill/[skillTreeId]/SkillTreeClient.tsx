"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SkillTreeSource } from "@/data/types";

const KnowledgeTree = dynamic(
  () => import("@/components/tree/KnowledgeTree"),
  { ssr: false }
);
const MobileTreeView = dynamic(
  () => import("@/components/tree/MobileTreeView"),
  { ssr: false }
);

interface Props {
  skillTreeId: string;
  title: string;
  accentColor: string;
  backHref: string;
  sources: SkillTreeSource[];
}

export default function SkillTreeClient({
  skillTreeId,
  title,
  accentColor,
  backHref,
  sources,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-babel-bg flex items-center justify-center">
        <div className="text-babel-text-secondary">Loading...</div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <MobileTreeView
        treeId={skillTreeId}
        title={title}
        accentColor={accentColor}
        backHref={backHref}
        sources={sources}
      />
    );
  }

  return (
    <KnowledgeTree
      treeId={skillTreeId}
      title={title}
      accentColor={accentColor}
      backHref={backHref}
      sources={sources}
    />
  );
}
