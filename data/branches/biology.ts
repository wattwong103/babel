import { BranchTree } from "../types";

export const biology: BranchTree = {
  id: "biology",
  title: "Biology",
  description:
    "The study of life in all its forms — from molecular mechanisms to ecosystems. Biology reveals how living systems grow, adapt, and interact.",
  icon: "leaf",
  grandTreeId: "natural-sciences",
  color: "#22c55e",
  nodes: [
    {
      id: "bio-foundations",
      title: "Biology Foundations",
      treeId: "biology",
      tier: 1,
      description:
        "Core concepts of life science: cells, DNA, evolution, and the classification of living things. The starting point for all biological understanding.",
      whatToLearn: [
        "Cell structure and function",
        "DNA, genes, and heredity basics",
        "Evolution by natural selection",
        "Taxonomy and classification of life",
        "Scientific method in biology",
      ],
      resources: [
        { label: "Khan Academy: Biology" },
        { label: "Campbell Biology (textbook)" },
      ],
      prerequisites: [],
      icon: "leaf",
      status: "unlocked",
      userNotes: "",
    },
    {
      id: "bio-ecology",
      title: "Ecology",
      treeId: "biology",
      tier: 2,
      description:
        "How organisms interact with each other and their environments. Ecology studies populations, communities, ecosystems, and the biosphere.",
      whatToLearn: [
        "Population dynamics and carrying capacity",
        "Community interactions (predation, competition, symbiosis)",
        "Energy flow and nutrient cycling",
        "Biomes and ecosystem services",
        "Conservation biology fundamentals",
      ],
      resources: [
        { label: "Khan Academy: Ecology" },
        { label: "Fundamentals of Ecology by Odum" },
      ],
      prerequisites: ["bio-foundations"],
      icon: "trees",
      status: "locked",
      userNotes: "",
    },
    {
      id: "bio-human-behavior",
      title: "Human Behavior & Ergonomics",
      treeId: "biology",
      tier: 3,
      description:
        "The biological basis of human behavior, perception, and physical capability. Essential for designing systems and environments that fit human needs.",
      whatToLearn: [
        "Sensory perception and cognitive load",
        "Circadian rhythms and fatigue",
        "Biomechanics and physical ergonomics",
        "Reaction times and attention spans",
        "Human factors in system design",
      ],
      resources: [
        { label: "Introduction to Human Factors Engineering" },
        { label: "Don Norman: The Design of Everyday Things" },
      ],
      prerequisites: ["bio-foundations"],
      icon: "person-standing",
      status: "locked",
      userNotes: "",
    },
  ],
};
