import { KnowledgeNode } from "./index";

export const scienceNodes: KnowledgeNode[] = [
  // === ERA 1: Ancient ===
  {
    id: "basic-logic",
    title: "Basic Logic",
    domain: "sciences",
    era: 1,
    description:
      "The foundation of all rational thought. Logic provides the rules for valid reasoning, distinguishing sound arguments from fallacies.",
    whatToLearn: [
      "Propositional logic and truth tables",
      "Logical connectives (AND, OR, NOT, IF-THEN)",
      "Deductive vs. inductive reasoning",
      "Common logical fallacies",
      "Syllogisms and argument structure",
    ],
    resources: [
      { label: "An Introduction to Formal Logic — P.D. Magnus" },
      { label: "Aristotle's Prior Analytics" },
      { label: "Logic: A Very Short Introduction — Graham Priest" },
    ],
    prerequisites: [],
    icon: "Brain",
    status: "unlocked",
    userNotes: "",
  },
  {
    id: "arithmetic",
    title: "Arithmetic & Number Theory",
    domain: "sciences",
    era: 1,
    description:
      "The study of numbers, their properties, and operations. From counting to the mysteries of primes, arithmetic is the bedrock of mathematics.",
    whatToLearn: [
      "Natural numbers, integers, rationals, reals",
      "Prime numbers and the Fundamental Theorem of Arithmetic",
      "Modular arithmetic basics",
      "Divisibility rules and GCD/LCM",
      "Number systems across civilizations",
    ],
    resources: [
      { label: "The Art of Problem Solving — Sandor Lehoczky" },
      { label: "Number Theory: A Lively Introduction — James Pommersheim" },
      { label: "Euclid's Elements, Books VII–IX" },
    ],
    prerequisites: [],
    icon: "Hash",
    status: "unlocked",
    userNotes: "",
  },
  {
    id: "scientific-method",
    title: "Observation & Scientific Method",
    domain: "sciences",
    era: 1,
    description:
      "The systematic approach to understanding the natural world through observation, hypothesis, experimentation, and analysis.",
    whatToLearn: [
      "Hypothesis formation and testing",
      "Controlled experiments and variables",
      "Falsifiability (Karl Popper)",
      "Empirical observation vs. speculation",
      "Reproducibility and peer review",
    ],
    resources: [
      { label: "The Structure of Scientific Revolutions — Thomas Kuhn" },
      { label: "What Is This Thing Called Science? — Alan Chalmers" },
    ],
    prerequisites: [],
    icon: "Microscope",
    status: "unlocked",
    userNotes: "",
  },

  // === ERA 2: Classical ===
  {
    id: "euclidean-geometry",
    title: "Euclidean Geometry",
    domain: "sciences",
    era: 2,
    description:
      "The geometry of flat space as formalized by Euclid. From axioms to theorems, it teaches rigorous mathematical proof.",
    whatToLearn: [
      "Euclid's five postulates",
      "Triangle congruence and similarity",
      "The Pythagorean theorem and its proofs",
      "Circle theorems and constructions",
      "Introduction to mathematical proof",
    ],
    resources: [
      { label: "Euclid's Elements" },
      { label: "Geometry Revisited — Coxeter & Greitzer" },
    ],
    prerequisites: ["basic-logic", "arithmetic"],
    icon: "Triangle",
    status: "locked",
    userNotes: "",
  },
  {
    id: "classical-mechanics",
    title: "Classical Mechanics",
    domain: "sciences",
    era: 2,
    description:
      "Newton's framework for understanding motion and forces. The laws that governed physics for centuries and still describe everyday reality.",
    whatToLearn: [
      "Newton's three laws of motion",
      "Gravitational force and orbits",
      "Conservation of energy and momentum",
      "Work, power, and kinetic energy",
      "Simple harmonic motion",
    ],
    resources: [
      { label: "Newton's Principia Mathematica" },
      { label: "Classical Mechanics — John R. Taylor" },
      { label: "The Feynman Lectures on Physics, Vol. 1" },
    ],
    prerequisites: ["arithmetic", "scientific-method"],
    icon: "Apple",
    status: "locked",
    userNotes: "",
  },
  {
    id: "astronomy-fundamentals",
    title: "Astronomy Fundamentals",
    domain: "sciences",
    era: 2,
    description:
      "Understanding the cosmos — from planetary motion to the structure of the solar system. The oldest of the natural sciences.",
    whatToLearn: [
      "Geocentric vs. heliocentric models",
      "Kepler's laws of planetary motion",
      "Celestial coordinate systems",
      "The phases of the Moon and eclipses",
      "Early telescopic observations (Galileo)",
    ],
    resources: [
      { label: "Cosmos — Carl Sagan" },
      { label: "Galileo's Sidereus Nuncius" },
    ],
    prerequisites: ["scientific-method"],
    icon: "Star",
    status: "locked",
    userNotes: "",
  },

  // === ERA 3: Medieval ===
  {
    id: "algebra",
    title: "Algebra",
    domain: "sciences",
    era: 3,
    description:
      "The language of mathematics itself. Algebra provides tools to express and solve general relationships between quantities.",
    whatToLearn: [
      "Variables, expressions, and equations",
      "Solving linear and quadratic equations",
      "Polynomials and factoring",
      "Systems of equations",
      "Al-Khwarizmi's contributions",
    ],
    resources: [
      { label: "Algebra — I.M. Gelfand" },
      { label: "Al-Khwarizmi's Compendious Book on Calculation" },
    ],
    prerequisites: ["arithmetic", "euclidean-geometry"],
    icon: "Variable",
    status: "locked",
    userNotes: "",
  },
  {
    id: "optics",
    title: "Optics & Light",
    domain: "sciences",
    era: 3,
    description:
      "The study of light — its nature, behavior, and interaction with matter. From Ibn al-Haytham's experiments to the wave-particle duality.",
    whatToLearn: [
      "Reflection and refraction",
      "Snell's law",
      "Lenses and mirrors",
      "The visible spectrum and color",
      "Ibn al-Haytham's Book of Optics",
    ],
    resources: [
      { label: "Optics — Eugene Hecht" },
      { label: "Ibn al-Haytham's Book of Optics" },
    ],
    prerequisites: ["classical-mechanics", "euclidean-geometry"],
    icon: "Sun",
    status: "locked",
    userNotes: "",
  },
  {
    id: "biology-foundations",
    title: "Biology Foundations",
    domain: "sciences",
    era: 3,
    description:
      "The study of life itself. From classification of organisms to understanding basic anatomy and the diversity of living things.",
    whatToLearn: [
      "Taxonomy and classification (Linnaeus)",
      "Cell theory basics",
      "Plant and animal anatomy",
      "Reproduction and life cycles",
      "Ecology fundamentals",
    ],
    resources: [
      { label: "Campbell Biology — Lisa Urry et al." },
      { label: "The Diversity of Life — E.O. Wilson" },
    ],
    prerequisites: ["scientific-method"],
    icon: "Leaf",
    status: "locked",
    userNotes: "",
  },

  // === ERA 4: Renaissance ===
  {
    id: "calculus",
    title: "Calculus",
    domain: "sciences",
    era: 4,
    description:
      "The mathematics of change and accumulation. Calculus unlocked modern physics, engineering, and economics.",
    whatToLearn: [
      "Limits and continuity",
      "Derivatives and rates of change",
      "Integrals and the area under curves",
      "The Fundamental Theorem of Calculus",
      "Applications to physics (velocity, acceleration)",
    ],
    resources: [
      { label: "Calculus — Michael Spivak" },
      { label: "The Calculus Lifesaver — Adrian Banner" },
    ],
    prerequisites: ["algebra"],
    icon: "TrendingUp",
    status: "locked",
    userNotes: "",
  },
  {
    id: "chemistry-fundamentals",
    title: "Chemistry Fundamentals",
    domain: "sciences",
    era: 4,
    description:
      "The science of matter and its transformations. Understanding atoms, molecules, and chemical reactions that make up our world.",
    whatToLearn: [
      "Atomic structure and the periodic table",
      "Chemical bonding (ionic, covalent, metallic)",
      "Stoichiometry and balancing equations",
      "States of matter and phase transitions",
      "Acids, bases, and pH",
    ],
    resources: [
      { label: "Chemistry: The Central Science — Brown et al." },
      { label: "The Disappearing Spoon — Sam Kean" },
    ],
    prerequisites: ["arithmetic", "scientific-method"],
    icon: "FlaskConical",
    status: "locked",
    userNotes: "",
  },
  {
    id: "electromagnetism",
    title: "Electromagnetism",
    domain: "sciences",
    era: 4,
    description:
      "The unified theory of electricity and magnetism. Maxwell's equations revealed light itself as an electromagnetic wave.",
    whatToLearn: [
      "Electric charge and Coulomb's law",
      "Electric and magnetic fields",
      "Faraday's law of induction",
      "Maxwell's equations (conceptual)",
      "Electromagnetic waves and the spectrum",
    ],
    resources: [
      { label: "Introduction to Electrodynamics — David Griffiths" },
      { label: "The Feynman Lectures on Physics, Vol. 2" },
    ],
    prerequisites: ["calculus", "classical-mechanics"],
    icon: "Zap",
    status: "locked",
    userNotes: "",
  },

  // === ERA 5: Modern ===
  {
    id: "evolutionary-theory",
    title: "Evolutionary Theory",
    domain: "sciences",
    era: 5,
    description:
      "Darwin's revolutionary insight: species change over time through natural selection, unifying all biology under one framework.",
    whatToLearn: [
      "Natural selection and adaptation",
      "Variation and heredity",
      "Speciation and the tree of life",
      "Evidence for evolution (fossils, DNA, homology)",
      "Modern evolutionary synthesis",
    ],
    resources: [
      { label: "On the Origin of Species — Charles Darwin" },
      { label: "The Selfish Gene — Richard Dawkins" },
    ],
    prerequisites: ["biology-foundations"],
    icon: "TreeDeciduous",
    status: "locked",
    userNotes: "",
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics",
    domain: "sciences",
    era: 5,
    description:
      "The science of heat, energy, and entropy. Thermodynamics governs engines, chemistry, and the arrow of time itself.",
    whatToLearn: [
      "The four laws of thermodynamics",
      "Heat, work, and internal energy",
      "Entropy and the second law",
      "Carnot engines and efficiency",
      "Statistical mechanics (introduction)",
    ],
    resources: [
      { label: "Thermal Physics — Daniel Schroeder" },
      { label: "The Feynman Lectures on Physics, Vol. 1 (Ch. 39–46)" },
    ],
    prerequisites: ["calculus", "chemistry-fundamentals"],
    icon: "Flame",
    status: "locked",
    userNotes: "",
  },
  {
    id: "cell-biology",
    title: "Cell Biology",
    domain: "sciences",
    era: 5,
    description:
      "The study of the fundamental unit of life. Understanding cells is key to genetics, medicine, and biotechnology.",
    whatToLearn: [
      "Cell organelles and their functions",
      "DNA, RNA, and protein synthesis",
      "Mitosis and meiosis",
      "Cellular respiration and photosynthesis",
      "Membrane transport and signaling",
    ],
    resources: [
      { label: "Molecular Biology of the Cell — Alberts et al." },
      { label: "The Cell: A Visual Tour — Jack Challoner" },
    ],
    prerequisites: ["biology-foundations", "chemistry-fundamentals"],
    icon: "Circle",
    status: "locked",
    userNotes: "",
  },

  // === ERA 6: Contemporary ===
  {
    id: "quantum-mechanics",
    title: "Quantum Mechanics",
    domain: "sciences",
    era: 6,
    description:
      "The physics of the very small. Quantum mechanics reveals a probabilistic universe that defies classical intuition.",
    whatToLearn: [
      "Wave-particle duality",
      "The Schrödinger equation (conceptual)",
      "Heisenberg's uncertainty principle",
      "Quantum superposition and entanglement",
      "The Copenhagen interpretation",
    ],
    resources: [
      { label: "Introduction to Quantum Mechanics — David Griffiths" },
      { label: "QED — Richard Feynman" },
    ],
    prerequisites: ["calculus", "electromagnetism"],
    icon: "Atom",
    status: "locked",
    userNotes: "",
  },
  {
    id: "relativity",
    title: "Relativity",
    domain: "sciences",
    era: 6,
    description:
      "Einstein's twin theories that reshaped our understanding of space, time, and gravity. Nothing is absolute except the speed of light.",
    whatToLearn: [
      "Special relativity and time dilation",
      "Mass-energy equivalence (E=mc²)",
      "General relativity and curved spacetime",
      "Gravitational lensing and black holes",
      "Experimental confirmations",
    ],
    resources: [
      { label: "Spacetime and Geometry — Sean Carroll" },
      { label: "Einstein's own 1905 papers (accessible translations)" },
    ],
    prerequisites: ["calculus", "electromagnetism"],
    icon: "Orbit",
    status: "locked",
    userNotes: "",
  },
  {
    id: "genetics-dna",
    title: "Genetics & DNA",
    domain: "sciences",
    era: 6,
    description:
      "The molecular basis of heredity. From Mendel's peas to CRISPR, genetics reveals how information flows through generations.",
    whatToLearn: [
      "Mendelian genetics and inheritance patterns",
      "DNA structure (Watson & Crick)",
      "Gene expression and regulation",
      "Mutations and genetic disorders",
      "Modern genomics and CRISPR",
    ],
    resources: [
      { label: "The Gene — Siddhartha Mukherjee" },
      { label: "Molecular Biology of the Gene — Watson et al." },
    ],
    prerequisites: ["cell-biology", "evolutionary-theory"],
    icon: "Dna",
    status: "locked",
    userNotes: "",
  },
  {
    id: "neuroscience",
    title: "Neuroscience Basics",
    domain: "sciences",
    era: 6,
    description:
      "The study of the nervous system and the brain. Neuroscience bridges biology, psychology, and the deepest questions about consciousness.",
    whatToLearn: [
      "Neuron structure and action potentials",
      "Synapses and neurotransmitters",
      "Brain anatomy and functional regions",
      "Neuroplasticity and learning",
      "Introduction to consciousness studies",
    ],
    resources: [
      { label: "Neuroscience: Exploring the Brain — Bear et al." },
      { label: "The Brain That Changes Itself — Norman Doidge" },
    ],
    prerequisites: ["cell-biology"],
    icon: "BrainCircuit",
    status: "locked",
    userNotes: "",
  },
];
