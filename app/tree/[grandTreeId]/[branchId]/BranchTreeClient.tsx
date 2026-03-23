"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const KnowledgeTree = dynamic(
  () => import("@/components/tree/KnowledgeTree"),
  { ssr: false }
);
const MobileTreeView = dynamic(
  () => import("@/components/tree/MobileTreeView"),
  { ssr: false }
);

interface Props {
  branchId: string;
  title: string;
  accentColor: string;
  backHref: string;
}

export default function BranchTreeClient({
  branchId,
  title,
  accentColor,
  backHref,
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
        treeId={branchId}
        title={title}
        accentColor={accentColor}
        backHref={backHref}
      />
    );
  }

  return (
    <KnowledgeTree
      treeId={branchId}
      title={title}
      accentColor={accentColor}
      backHref={backHref}
    />
  );
}
