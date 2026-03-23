import { BranchTree } from "../types";

export const geography: BranchTree = {
  id: "geography",
  title: "Geography",
  description:
    "The study of places, spaces, and the relationships between people and their environments. Geography bridges the physical and social sciences.",
  icon: "globe",
  grandTreeId: "social-sciences",
  color: "#f59e0b",
  nodes: [
    {
      id: "geo-physical",
      title: "Physical Geography",
      treeId: "geography",
      tier: 1,
      description:
        "The natural features of Earth's surface — landforms, climate, water systems, and soils. Understanding the physical canvas on which human activity unfolds.",
      whatToLearn: [
        "Landforms and geomorphology",
        "Climate systems and weather patterns",
        "Hydrology and water resources",
        "Soils and natural vegetation",
        "Map reading and basic cartography",
      ],
      resources: [
        { label: "Physical Geography by Petersen et al." },
        { label: "National Geographic: Geography resources" },
      ],
      prerequisites: [],
      icon: "mountain",
      status: "unlocked",
      userNotes: "",
    },
    {
      id: "geo-human",
      title: "Human Geography",
      treeId: "geography",
      tier: 2,
      description:
        "How humans organize space — settlement patterns, migration, urbanization, and the cultural landscape. The spatial dimension of social life.",
      whatToLearn: [
        "Population distribution and migration",
        "Urbanization and city structure models",
        "Cultural landscapes and place identity",
        "Economic geography and spatial inequality",
        "Political boundaries and territoriality",
      ],
      resources: [
        { label: "Human Geography by Knox & Marston" },
        { label: "Crash Course: Geography" },
      ],
      prerequisites: ["geo-physical"],
      icon: "map-pin",
      status: "locked",
      userNotes: "",
    },
    {
      id: "geo-spatial-analysis",
      title: "Spatial Analysis",
      treeId: "geography",
      tier: 3,
      description:
        "Quantitative methods for analyzing geographic patterns. From GIS to spatial statistics, these tools turn location data into actionable insights.",
      whatToLearn: [
        "Geographic Information Systems (GIS) fundamentals",
        "Spatial data types (vector, raster)",
        "Geocoding and coordinate systems",
        "Spatial statistics and pattern detection",
        "Remote sensing basics",
      ],
      resources: [
        { label: "GIS Fundamentals by Bolstad" },
        { label: "Esri: GIS Learning Resources" },
      ],
      prerequisites: ["geo-human"],
      icon: "map",
      status: "locked",
      userNotes: "",
    },
    {
      id: "geo-urban",
      title: "Urban Geography",
      treeId: "geography",
      tier: 4,
      description:
        "Deep dive into cities — their form, function, growth, and challenges. Urban geography examines how cities work and how they can work better.",
      whatToLearn: [
        "Urban morphology and land use patterns",
        "Central place theory and urban hierarchies",
        "Suburbanization and sprawl",
        "Urban renewal and gentrification",
        "Smart cities and urban resilience",
      ],
      resources: [
        { label: "Urban Geography by Pacione" },
        { label: "The Death and Life of Great American Cities by Jane Jacobs" },
      ],
      prerequisites: ["geo-human", "geo-spatial-analysis"],
      icon: "building-2",
      status: "locked",
      userNotes: "",
    },
  ],
};
