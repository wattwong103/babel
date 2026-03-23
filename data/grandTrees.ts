import { GrandTree } from "./types";

export const grandTrees: GrandTree[] = [
  {
    id: "formal-sciences",
    title: "Formal Sciences",
    description:
      "The foundations of reasoning — mathematics, logic, statistics, and computation. These abstract frameworks underpin every other field of knowledge.",
    icon: "sigma",
    color: "#3b82f6",
    branches: ["mathematics", "logic"],
  },
  {
    id: "natural-sciences",
    title: "Natural Sciences",
    description:
      "Understanding the physical world — from subatomic particles to ecosystems. Physics, chemistry, biology, and earth sciences reveal the laws of nature.",
    icon: "atom",
    color: "#10b981",
    branches: ["biology"],
  },
  {
    id: "social-sciences",
    title: "Social Sciences",
    description:
      "The study of human societies and relationships — economics, geography, psychology, political science, and sociology shape our understanding of collective behavior.",
    icon: "users",
    color: "#f59e0b",
    branches: ["geography", "economics", "political-science", "psychology"],
  },
  {
    id: "humanities",
    title: "Humanities",
    description:
      "Exploring the human experience through philosophy, history, literature, languages, and the arts. The lens through which we interpret meaning and culture.",
    icon: "book-open",
    color: "#a855f7",
    branches: ["philosophy"],
  },
  {
    id: "applied-sciences",
    title: "Applied Sciences",
    description:
      "Putting knowledge to work — engineering, medicine, and agriculture. Practical disciplines that solve real-world problems by integrating theory and practice.",
    icon: "wrench",
    color: "#ef4444",
    branches: [],
  },
  {
    id: "interdisciplinary",
    title: "Interdisciplinary",
    description:
      "Fields that transcend traditional boundaries, weaving together knowledge from multiple domains. Transportation sciences, environmental studies, and more.",
    icon: "network",
    color: "#06b6d4",
    branches: [],
    skillTrees: ["transportation-sciences"],
  },
];
