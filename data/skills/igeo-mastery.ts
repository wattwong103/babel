import { SkillTree } from "../types";
import { igeoTier1Nodes } from "./igeo-tier-1";
import { igeoTier2Nodes } from "./igeo-tier-2";
import { igeoTier3Nodes } from "./igeo-tier-3";
import { igeoTier4Nodes } from "./igeo-tier-4";
import { igeoTier5Nodes } from "./igeo-tier-5";
import { igeoTier6Nodes } from "./igeo-tier-6";

export const igeoMastery: SkillTree = {
  id: "igeo-mastery",
  title: "iGeo Mastery",
  description:
    "A comprehensive path from geographic literacy to International Geography Olympiad medal-level mastery. Covers all 12 iGeo categories with hands-on fieldwork, GIS projects, and mock exam practice — based on the UK A-level curriculum and official iGeo syllabus.",
  icon: "trophy",
  color: "#14b8a6",
  sources: [
    { branchId: "geography", label: "Geography", color: "#f59e0b" },
    { branchId: "earth-science", label: "Earth Science", color: "#0ea5e9" },
    { branchId: "mathematics", label: "Mathematics", color: "#3b82f6" },
    { branchId: "biology", label: "Biology", color: "#22c55e" },
    { branchId: "economics", label: "Economics", color: "#eab308" },
    { branchId: "political-science", label: "Political Science", color: "#d97706" },
  ],
  nodes: [
    ...igeoTier1Nodes,
    ...igeoTier2Nodes,
    ...igeoTier3Nodes,
    ...igeoTier4Nodes,
    ...igeoTier5Nodes,
    ...igeoTier6Nodes,
  ],
};
