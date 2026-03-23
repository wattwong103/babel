import { BranchTree } from "../types";

export const psychology: BranchTree = {
  id: "psychology",
  title: "Psychology",
  description:
    "The science of mind and behavior. Psychology investigates how people think, feel, and act — individually and in groups.",
  icon: "brain",
  grandTreeId: "social-sciences",
  color: "#f97316",
  nodes: [
    {
      id: "psych-cognitive",
      title: "Cognitive Psychology",
      treeId: "psychology",
      tier: 1,
      description:
        "How the mind processes information — perception, attention, memory, and decision-making. The foundation for understanding human thought.",
      whatToLearn: [
        "Perception and attention",
        "Memory systems (short-term, long-term, working)",
        "Decision-making and cognitive biases",
        "Problem solving and reasoning",
        "Language and thought",
      ],
      resources: [
        { label: "Cognitive Psychology by Sternberg" },
        { label: "Thinking, Fast and Slow by Daniel Kahneman" },
      ],
      prerequisites: [],
      icon: "brain",
      status: "unlocked",
      userNotes: "",
    },
    {
      id: "psych-behavioral",
      title: "Behavioral Science",
      treeId: "psychology",
      tier: 2,
      description:
        "Understanding and predicting human behavior through empirical research. Behavioral science informs nudges, incentives, and behavior change strategies.",
      whatToLearn: [
        "Classical and operant conditioning",
        "Behavioral economics and nudge theory",
        "Habit formation and behavior change",
        "Social influence and conformity",
        "Motivation theories",
      ],
      resources: [
        { label: "Nudge by Thaler & Sunstein" },
        { label: "Influence by Robert Cialdini" },
      ],
      prerequisites: ["psych-cognitive"],
      icon: "activity",
      status: "locked",
      userNotes: "",
    },
    {
      id: "psych-human-factors",
      title: "Human Factors & UX",
      treeId: "psychology",
      tier: 3,
      description:
        "Applying psychological principles to the design of systems, interfaces, and environments. Making technology and infrastructure work for people.",
      whatToLearn: [
        "Human-computer interaction principles",
        "Usability testing and user research",
        "Error analysis and prevention",
        "Workload and situation awareness",
        "Designing for accessibility and inclusion",
      ],
      resources: [
        { label: "The Design of Everyday Things by Don Norman" },
        { label: "Human Factors in Engineering and Design" },
      ],
      prerequisites: ["psych-behavioral"],
      icon: "monitor",
      status: "locked",
      userNotes: "",
    },
  ],
};
