"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with React Flow
const KnowledgeTree = dynamic(
  () => import("@/components/tree/KnowledgeTree"),
  { ssr: false }
);

const MobileTreeView = dynamic(
  () => import("@/components/tree/MobileTreeView"),
  { ssr: false }
);

type Domain = "sciences" | "humanities";

export default function TreePage() {
  const params = useParams();
  const domain = params.domain as Domain;
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-babel-bg flex items-center justify-center">
        <div className="text-babel-text-secondary font-heading text-xl">
          Loading...
        </div>
      </div>
    );
  }

  if (domain !== "sciences" && domain !== "humanities") {
    return (
      <div className="h-screen w-screen bg-babel-bg flex items-center justify-center">
        <div className="text-babel-text-secondary">Unknown domain</div>
      </div>
    );
  }

  if (isMobile) {
    return <MobileTreeView domain={domain} />;
  }

  return <KnowledgeTree domain={domain} />;
}
