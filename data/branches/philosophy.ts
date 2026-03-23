import { BranchTree } from "../types";

export const philosophy: BranchTree = {
  id: "philosophy",
  title: "Philosophy",
  description:
    "The pursuit of wisdom through reason. Philosophy examines fundamental questions about existence, knowledge, values, and the good life.",
  icon: "lightbulb",
  grandTreeId: "humanities",
  color: "#a855f7",
  nodes: [
    {
      id: "phil-ethics",
      title: "Ethics Foundations",
      treeId: "philosophy",
      tier: 1,
      description:
        "The study of right and wrong, good and bad. Ethics provides frameworks for moral reasoning that guide individual and collective decisions.",
      whatToLearn: [
        "Major ethical theories (utilitarianism, deontology, virtue ethics)",
        "Moral reasoning and dilemmas",
        "Rights, duties, and justice",
        "Relativism vs. universalism",
        "The is-ought problem",
      ],
      resources: [
        { label: "Justice by Michael Sandel" },
        { label: "Crash Course: Philosophy (Ethics)" },
      ],
      prerequisites: [],
      icon: "heart",
      status: "unlocked",
      userNotes: "",
    },
    {
      id: "phil-applied-ethics",
      title: "Applied Ethics",
      treeId: "philosophy",
      tier: 2,
      description:
        "Bringing ethical theory to real-world problems — bioethics, environmental ethics, professional ethics, and the moral dimensions of technology and policy.",
      whatToLearn: [
        "Bioethics and medical ethics",
        "Environmental ethics and sustainability",
        "Technology ethics and AI",
        "Professional and business ethics",
        "Ethical frameworks for policy analysis",
      ],
      resources: [
        { label: "Practical Ethics by Peter Singer" },
        { label: "Ethics in Practice (anthology)" },
      ],
      prerequisites: ["phil-ethics"],
      icon: "scale",
      status: "locked",
      userNotes: "",
    },
    {
      id: "phil-political",
      title: "Political Philosophy",
      treeId: "philosophy",
      tier: 3,
      description:
        "Foundational questions about justice, liberty, authority, and the social contract. Political philosophy underpins our understanding of governance and rights.",
      whatToLearn: [
        "Social contract theory (Hobbes, Locke, Rousseau)",
        "Justice theories (Rawls, Nozick)",
        "Liberty and its limits",
        "Democracy and legitimacy",
        "Communitarianism and cosmopolitanism",
      ],
      resources: [
        { label: "A Theory of Justice by John Rawls" },
        { label: "Stanford Encyclopedia: Political Philosophy" },
      ],
      prerequisites: ["phil-ethics"],
      icon: "gavel",
      status: "locked",
      userNotes: "",
    },
  ],
};
