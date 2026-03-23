import { BranchTree } from "../types";

export const politicalScience: BranchTree = {
  id: "political-science",
  title: "Political Science",
  description:
    "The study of power, governance, and public affairs. Political science examines how societies make collective decisions and organize authority.",
  icon: "landmark",
  grandTreeId: "social-sciences",
  color: "#d97706",
  nodes: [
    {
      id: "polsci-government",
      title: "Government & Institutions",
      treeId: "political-science",
      tier: 1,
      description:
        "The structures of political authority — constitutions, branches of government, elections, and the institutions that shape public life.",
      whatToLearn: [
        "Forms of government (democracy, authoritarianism, etc.)",
        "Constitutional design and separation of powers",
        "Electoral systems and voting behavior",
        "Political parties and interest groups",
        "Federalism and local governance",
      ],
      resources: [
        { label: "American Government (OpenStax)" },
        { label: "Crash Course: Government and Politics" },
      ],
      prerequisites: [],
      icon: "landmark",
      status: "unlocked",
      userNotes: "",
    },
    {
      id: "polsci-policy",
      title: "Public Policy Analysis",
      treeId: "political-science",
      tier: 2,
      description:
        "How governments identify problems, design solutions, and implement policies. The policy cycle from agenda-setting to evaluation.",
      whatToLearn: [
        "The policy cycle: agenda, formulation, adoption, implementation, evaluation",
        "Stakeholder analysis and coalition building",
        "Regulatory frameworks and compliance",
        "Evidence-based policy making",
        "Policy evaluation methods",
      ],
      resources: [
        { label: "Public Policy: Politics, Analysis, and Alternatives" },
        { label: "Coursera: Public Policy Challenges" },
      ],
      prerequisites: ["polsci-government"],
      icon: "file-text",
      status: "locked",
      userNotes: "",
    },
    {
      id: "polsci-governance",
      title: "Governance & Administration",
      treeId: "political-science",
      tier: 3,
      description:
        "The practice of governing — public administration, bureaucracy, accountability, and the challenge of translating policy into effective action.",
      whatToLearn: [
        "Public administration theory and practice",
        "Bureaucratic organization and reform",
        "Accountability and transparency mechanisms",
        "Intergovernmental relations",
        "Public sector innovation",
      ],
      resources: [
        { label: "Public Administration: Concepts and Cases" },
        { label: "OECD Governance resources" },
      ],
      prerequisites: ["polsci-policy"],
      icon: "shield",
      status: "locked",
      userNotes: "",
    },
  ],
};
