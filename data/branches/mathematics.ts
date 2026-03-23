import { BranchTree } from "../types";

export const mathematics: BranchTree = {
  id: "mathematics",
  title: "Mathematics",
  description:
    "The language of patterns and structure — from arithmetic to calculus, mathematics provides the tools to quantify, model, and reason about the world.",
  icon: "hash",
  grandTreeId: "formal-sciences",
  color: "#3b82f6",
  nodes: [
    {
      id: "math-arithmetic",
      title: "Arithmetic & Number Systems",
      treeId: "mathematics",
      tier: 1,
      description:
        "The bedrock of mathematics. Master the properties of numbers, operations, fractions, and the number line that all higher math builds upon.",
      whatToLearn: [
        "Natural numbers, integers, rationals, and reals",
        "Four fundamental operations and order of operations",
        "Fractions, decimals, and percentages",
        "Prime numbers and divisibility",
        "Estimation and mental math strategies",
      ],
      resources: [
        { label: "Khan Academy: Arithmetic" },
        { label: "Art of Problem Solving: Prealgebra" },
      ],
      prerequisites: [],
      icon: "hash",
      status: "unlocked",
      userNotes: "",
    },
    {
      id: "math-algebra",
      title: "Algebra",
      treeId: "mathematics",
      tier: 2,
      description:
        "The art of generalizing arithmetic with variables and equations. Algebra unlocks the ability to model relationships and solve for unknowns.",
      whatToLearn: [
        "Variables, expressions, and equations",
        "Linear and quadratic equations",
        "Functions and their graphs",
        "Systems of equations",
        "Inequalities and absolute value",
      ],
      resources: [
        { label: "Khan Academy: Algebra" },
        { label: "MIT OCW: 18.01 Single Variable Calculus (prereq review)" },
      ],
      prerequisites: ["math-arithmetic"],
      icon: "variable",
      status: "locked",
      userNotes: "",
    },
    {
      id: "math-statistics",
      title: "Statistics & Probability",
      treeId: "mathematics",
      tier: 3,
      description:
        "The science of data and uncertainty. Learn to collect, analyze, and draw conclusions from data, and to reason about chance and randomness.",
      whatToLearn: [
        "Descriptive statistics: mean, median, mode, variance",
        "Probability theory and distributions",
        "Sampling methods and bias",
        "Hypothesis testing and confidence intervals",
        "Correlation vs. causation",
      ],
      resources: [
        { label: "Khan Academy: Statistics & Probability" },
        { label: "Seeing Theory (interactive visualizations)" },
      ],
      prerequisites: ["math-algebra"],
      icon: "bar-chart-3",
      status: "locked",
      userNotes: "",
    },
    {
      id: "math-calculus",
      title: "Calculus",
      treeId: "mathematics",
      tier: 4,
      description:
        "The mathematics of change and accumulation. Derivatives and integrals open the door to modeling dynamic systems in physics, economics, and beyond.",
      whatToLearn: [
        "Limits and continuity",
        "Derivatives and rates of change",
        "Integration and area under curves",
        "Fundamental theorem of calculus",
        "Applications to optimization and motion",
      ],
      resources: [
        { label: "MIT OCW: 18.01 Single Variable Calculus" },
        { label: "3Blue1Brown: Essence of Calculus" },
      ],
      prerequisites: ["math-algebra"],
      icon: "trending-up",
      status: "locked",
      userNotes: "",
    },
  ],
};
