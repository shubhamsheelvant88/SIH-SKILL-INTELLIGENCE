const sampleSkillDemands = [
  {
    district: "Bengaluru",
    sector: "IT",
    course: "Full Stack Development",
    industryDemand: {
      JavaScript: 85,
      React: 72,
      "Node.js": 68,
      MongoDB: 51,
      AWS: 45,
      Docker: 38,
      TypeScript: 34
    },
    currentCurriculum: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "MongoDB"
    ]
  }
];

const sampleJobPostings = [
  {
    company: "TechNova Solutions",
    role: "Full Stack Developer",
    location: "Bengaluru",
    description: "Looking for an experienced Full Stack Developer proficient in React, Node.js, JavaScript, and AWS cloud deployment.",
    extractedSkills: ["JavaScript", "React", "Node.js", "AWS"]
  },
  {
    company: "CloudScale Systems",
    role: "DevOps & Cloud Engineer",
    location: "Bengaluru",
    description: "Seeking a DevOps engineer with hands-on skills in Docker, AWS, Linux, and Python scripting.",
    extractedSkills: ["Docker", "AWS", "Python"]
  },
  {
    company: "PixelCraft Digital",
    role: "Frontend Engineer",
    location: "Bengaluru",
    description: "Frontend developer needed with expertise in React, TypeScript, HTML, and modern CSS.",
    extractedSkills: ["React", "TypeScript", "HTML", "CSS", "JavaScript"]
  }
];

const sampleEmployerFeedbacks = [
  {
    company: "Infosys Labs",
    role: "Software Associate",
    skills: [
      { skill: "React", proficiency: "Advanced" },
      { skill: "AWS", proficiency: "Intermediate" },
      { skill: "JavaScript", proficiency: "Expert" }
    ],
    feedback: "Candidates need strong practical exposure to React state management and cloud hosting on AWS."
  },
  {
    company: "Wipro Digital",
    role: "Application Developer",
    skills: [
      { skill: "Docker", proficiency: "Intermediate" },
      { skill: "TypeScript", proficiency: "Intermediate" },
      { skill: "Node.js", proficiency: "Advanced" }
    ],
    feedback: "Understanding containerization with Docker and typed code in TypeScript improves production readiness."
  }
];

const samplePlacementOutcomes = [
  {
    district: "Bengaluru",
    course: "Full Stack Development",
    studentsTrained: 60,
    studentsCompleted: 54,
    studentsPlaced: 46,
    averageSalary: 450000,
    skillsUsed: ["JavaScript", "React", "Node.js", "MongoDB"],
    employerSatisfaction: 4
  },
  {
    district: "Bengaluru",
    course: "Cloud & DevOps",
    studentsTrained: 40,
    studentsCompleted: 38,
    studentsPlaced: 32,
    averageSalary: 520000,
    skillsUsed: ["AWS", "Docker", "Linux"],
    employerSatisfaction: 5
  }
];

module.exports = {
  sampleSkillDemands,
  sampleJobPostings,
  sampleEmployerFeedbacks,
  samplePlacementOutcomes
};
