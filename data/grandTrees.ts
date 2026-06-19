import { GrandTree } from "./types";

export const grandTrees: GrandTree[] = [
  {
    id: "formal-sciences",
    title: "Formal Sciences",
    description:
      "The foundations of reasoning — mathematics, logic, statistics, and computation. These abstract frameworks underpin every other field of knowledge.",
    icon: "sigma",
    color: "#4f8dd6",
    branches: ["mathematics", "logic"],
  },
  {
    id: "natural-sciences",
    title: "Natural Sciences",
    description:
      "Understanding the physical world — from subatomic particles to ecosystems. Physics, chemistry, biology, and earth sciences reveal the laws of nature.",
    icon: "atom",
    color: "#38b58e",
    branches: ["biology", "earth-science"],
  },
  {
    id: "social-sciences",
    title: "Social Sciences",
    description:
      "The study of human societies and relationships — economics, geography, psychology, political science, and sociology shape our understanding of collective behavior.",
    icon: "users",
    color: "#e0a93a",
    branches: ["geography", "economics", "political-science", "psychology"],
  },
  {
    id: "humanities",
    title: "Humanities",
    description:
      "Exploring the human experience through philosophy, history, literature, languages, and the arts. The lens through which we interpret meaning and culture.",
    icon: "book-open",
    color: "#8e7cc3",
    branches: ["philosophy"],
  },
  {
    id: "applied-sciences",
    title: "Applied Sciences",
    description:
      "Putting knowledge to work — engineering, medicine, and agriculture. Practical disciplines that solve real-world problems by integrating theory and practice.",
    icon: "wrench",
    color: "#e8633f",
    branches: [],
  },
  {
    id: "interdisciplinary",
    title: "Interdisciplinary",
    description:
      "Fields that transcend traditional boundaries, weaving together knowledge from multiple domains. Transportation sciences, environmental studies, and more.",
    icon: "network",
    color: "#2fb6a8",
    branches: [],
    skillTrees: ["transportation-sciences", "four-step-model-project", "igeo-mastery"],
  },
];
