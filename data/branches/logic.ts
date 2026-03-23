import { BranchTree } from "../types";

export const logic: BranchTree = {
  id: "logic",
  title: "Logic",
  description:
    "The discipline of valid reasoning — from propositional logic to systems thinking. Logic provides the framework for clear argumentation and structured analysis.",
  icon: "git-branch",
  grandTreeId: "formal-sciences",
  color: "#6366f1",
  nodes: [
    {
      id: "logic-propositional",
      title: "Propositional Logic",
      treeId: "logic",
      tier: 1,
      description:
        "The foundation of formal reasoning. Learn to construct and evaluate logical statements using connectives, truth tables, and inference rules.",
      whatToLearn: [
        "Propositions and logical connectives (AND, OR, NOT, IF-THEN)",
        "Truth tables and logical equivalence",
        "Validity, soundness, and common fallacies",
        "Basic proof techniques",
        "De Morgan's laws and logical identities",
      ],
      resources: [
        { label: "Introduction to Logic (Stanford Encyclopedia)" },
        { label: "Coursera: Introduction to Logic" },
      ],
      prerequisites: [],
      icon: "git-branch",
      status: "unlocked",
      userNotes: "",
    },
    {
      id: "logic-systems-thinking",
      title: "Systems Thinking",
      treeId: "logic",
      tier: 2,
      description:
        "Understanding complex wholes through their interconnected parts. Systems thinking reveals feedback loops, emergent behavior, and unintended consequences.",
      whatToLearn: [
        "Systems, boundaries, and environments",
        "Feedback loops (positive and negative)",
        "Emergence and nonlinear behavior",
        "Stocks, flows, and system dynamics",
        "Leverage points and intervention strategies",
      ],
      resources: [
        { label: "Thinking in Systems by Donella Meadows" },
        { label: "MIT System Dynamics resources" },
      ],
      prerequisites: ["logic-propositional"],
      icon: "workflow",
      status: "locked",
      userNotes: "",
    },
    {
      id: "logic-formal-reasoning",
      title: "Formal Reasoning & Proofs",
      treeId: "logic",
      tier: 3,
      description:
        "Advanced logical methods including predicate logic, quantifiers, and formal proof systems that underpin mathematics and computer science.",
      whatToLearn: [
        "Predicate logic and quantifiers (∀, ∃)",
        "Proof by contradiction and contrapositive",
        "Mathematical induction",
        "Set theory foundations",
        "Formal languages and computability basics",
      ],
      resources: [
        { label: "How to Prove It by Daniel Velleman" },
        { label: "MIT OCW: Mathematics for Computer Science" },
      ],
      prerequisites: ["logic-propositional"],
      icon: "check-square",
      status: "locked",
      userNotes: "",
    },
  ],
};
