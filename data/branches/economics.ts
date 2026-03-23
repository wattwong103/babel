import { BranchTree } from "../types";

export const economics: BranchTree = {
  id: "economics",
  title: "Economics",
  description:
    "The study of how societies allocate scarce resources. Economics illuminates decision-making, markets, trade-offs, and the forces shaping prosperity.",
  icon: "trending-up",
  grandTreeId: "social-sciences",
  color: "#eab308",
  nodes: [
    {
      id: "econ-micro",
      title: "Microeconomics",
      treeId: "economics",
      tier: 1,
      description:
        "Individual decision-making and markets. How consumers choose, firms produce, and prices emerge from the interaction of supply and demand.",
      whatToLearn: [
        "Supply and demand fundamentals",
        "Elasticity and market equilibrium",
        "Consumer choice and utility theory",
        "Production costs and firm behavior",
        "Market structures (perfect competition, monopoly, oligopoly)",
      ],
      resources: [
        { label: "Khan Academy: Microeconomics" },
        { label: "Principles of Economics by Mankiw" },
      ],
      prerequisites: [],
      icon: "shopping-cart",
      status: "unlocked",
      userNotes: "",
    },
    {
      id: "econ-macro",
      title: "Macroeconomics",
      treeId: "economics",
      tier: 2,
      description:
        "The economy as a whole — GDP, inflation, unemployment, and monetary/fiscal policy. Understanding the big picture of economic performance.",
      whatToLearn: [
        "GDP and national income accounting",
        "Inflation and the price level",
        "Unemployment types and measurement",
        "Monetary and fiscal policy tools",
        "International trade and exchange rates",
      ],
      resources: [
        { label: "Khan Academy: Macroeconomics" },
        { label: "CORE Econ: The Economy" },
      ],
      prerequisites: ["econ-micro"],
      icon: "landmark",
      status: "locked",
      userNotes: "",
    },
    {
      id: "econ-cost-benefit",
      title: "Cost-Benefit Analysis",
      treeId: "economics",
      tier: 3,
      description:
        "A systematic framework for evaluating projects and policies by comparing their costs and benefits in monetary terms. Essential for public decision-making.",
      whatToLearn: [
        "Identifying and measuring costs and benefits",
        "Discounting and present value",
        "Externalities and social costs",
        "Sensitivity analysis and uncertainty",
        "Applying CBA to public projects",
      ],
      resources: [
        { label: "Cost-Benefit Analysis: Concepts and Practice by Boardman" },
        { label: "World Bank: CBA Guidelines" },
      ],
      prerequisites: ["econ-micro"],
      icon: "scale",
      status: "locked",
      userNotes: "",
    },
  ],
};
