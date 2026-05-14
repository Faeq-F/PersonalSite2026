import Dexie, { type EntityTable } from 'dexie';

// Consider end dates before the start date as 'In Progress'
// (required since dexie cannot index null or undefined )

interface Skill {
  name: string;
  experienceLevel: string[];
  category: string[]; // their names
}

interface SkillCategory {
  name: string;
  subCategories: string[]; // their names
}

interface Certificate {
  organization: string[]; // their names
  name: string;
  images: string[];
  skills: string[]; // their names
  links: string[]; // their urls
  description: string;
  awarded: Date;
  isFeatured?: boolean;
}

interface Project {
  name: string;
  skills: string[]; // their names
  startDate: Date;
  endDate: Date;
  description: string;
  links: string[]; // their urls
  relatedActivities: number[]; // their ids
  relatedProjects: string[]; // their names
  images: string[]; // their urls
  isFeatured?: boolean;
}

interface Link {
  url: string;
  type: string; // their name
}

interface LinkType {
  name: string;
}

interface Role {
  id: number;
  organization: string[]; // their names
  name: string;
  type: string;
  category: string[]; // their names
  startDate: Date;
  endDate: Date;
  skills: string[]; // their names
  modules: string[]; // their codes
  locations: string[];
  description: string;
  links: string[]; // their urls
  relatedActivities: number[]; // their ids
}

interface RoleCategory {
  name: string;
  skills: string[]; // their names
}

interface Organization {
  name: string;
  roles: number[]; // their ids
  locations: string[];
  links: string[]; // their urls
}

interface Module {
  organization: string[]; // their names
  name: string;
  code: string;
  grade: string;
  year: string;
}


const db = new Dexie('Database') as Dexie & {
  // typing
  skills: EntityTable<Skill, 'name'>;
  skillCategories: EntityTable<SkillCategory, 'name'>;
  certificates: EntityTable<Certificate, 'name'>;
  projects: EntityTable<Project, 'name'>;
  links: EntityTable<Link, 'url'>;
  linkTypes: EntityTable<LinkType, 'name'>;
  roles: EntityTable<Role, 'id'>;
  roleCategories: EntityTable<RoleCategory, 'name'>;
  organizations: EntityTable<Organization, 'name'>;
  modules: EntityTable<Module, 'code'>;
};

// useful for when modifying this file during development
db.delete().then(() => db.open()) // ensure localstorage is cleared

// Schema declaration:
db.version(2).stores({
  skills: 'name, *category, *experienceLevel',
  skillCategories: 'name, *subCategories',
  certificates: 'name, *organization, *skills, code',
  projects: 'name, *skills, startDate, endDate, *relatedActivities, *relatedProjects, *images',
  links: 'url, type',
  linkTypes: 'name',
  roles: 'id, name, *organization, type, *category, startDate, endDate, *skills, *locations, *relatedActivities',
  roleCategories: 'name, *skills',
  organizations: 'name, *roles, *locations',
  modules: 'code, name, *organization, grade, year'
});

db.on('populate', () => {

  db.skillCategories.bulkPut([
    {
      name: 'Hard Skills', subCategories: ['Languages', 'IDEs & Code Editors',
        'Version Control', 'Office Suites', 'Graphics', 'Operating Systems',
        'Data Science Tools', 'Communication Tools', 'Libraries & Frameworks',
        'Automation', 'Testing', 'Simulators', 'Runtime Environments',
        'Machine Learning', 'CLI', 'GUI', 'Android Customization', 'Windows Customization', 'Databases'
      ]
    },
    {
      name: "Languages", subCategories: ['Programming Languages',
        'Scripting Languages', 'Style Sheet Languages', 'Markup Languages',
        'Query Languages', 'Data Definition Languages', 'Front-End Languages',
        'Back-End Languages', 'High-Level Languages', 'Low-Level Languages',
        'Modelling Languages']
    },
    {
      name: "Programming Languages", subCategories: [
        'Functional Programming Languages', 'Object-Oriented Programming Languages',
        'Procedural Programming Languages', 'Logic Programming Languages',
        'Assembly Languages']
    },
    { name: 'Scripting Languages', subCategories: [] },
    { name: 'Style Sheet Languages', subCategories: [] },
    { name: 'Markup Languages', subCategories: [] },
    { name: 'Query Languages', subCategories: [] },
    { name: 'Data Definition Languages', subCategories: [] },
    { name: 'Front-End Languages', subCategories: [] },
    { name: 'Back-End Languages', subCategories: [] },
    { name: 'High-Level Languages', subCategories: [] },
    { name: 'Low-Level Languages', subCategories: [] },
    { name: 'Modelling Languages', subCategories: [] },
    { name: 'Functional Programming Languages', subCategories: [] },
    { name: 'Object-Oriented Programming Languages', subCategories: [] },
    { name: 'Procedural Programming Languages', subCategories: [] },
    { name: 'Logic Programming Languages', subCategories: [] },
    { name: 'Assembly Languages', subCategories: [] },
    //
    { name: 'IDEs & Code Editors', subCategories: [] },
    { name: 'Libraries & Frameworks', subCategories: [] },
    { name: 'Machine Learning', subCategories: [] },
    { name: 'Simulators', subCategories: [] },
    { name: 'CLI', subCategories: [] },
    { name: 'GUI', subCategories: [] },
    { name: 'Runtime Environments', subCategories: [] },
    { name: 'Automation', subCategories: [] },
    { name: 'Testing', subCategories: [] },
    { name: 'Version Control', subCategories: [] },
    { name: 'Office Suites', subCategories: ['Adobe Suite'] },
    { name: 'Adobe Suite', subCategories: [] },
    { name: 'Graphics', subCategories: [] },
    { name: 'Databases', subCategories: ['NoSQL'] },
    { name: 'NoSQL', subCategories: [] },
    { name: 'Operating Systems', subCategories: [] },
    { name: 'Data Science Tools', subCategories: [] },
    { name: 'Communication Tools', subCategories: [] },
    { name: 'Android Customization', subCategories: [] },
    { name: 'Windows Customization', subCategories: [] },
    {
      name: 'Soft Skills', subCategories: ['Spoken Languages',
        'Communication Skills', 'Teamwork Skills', 'Problem-Solving Skills',
        'Leadership Skills', 'Work Ethic Skills', 'Creative Skills']
    },
    { name: 'Spoken Languages', subCategories: ['Romance languages (Latin Languages)'] },
    { name: 'Romance languages (Latin Languages)', subCategories: [] },
    { name: 'Communication Skills', subCategories: [] },
    { name: 'Teamwork Skills', subCategories: [] },
    { name: 'Problem-Solving Skills', subCategories: [] },
    { name: 'Leadership Skills', subCategories: [] },
    { name: 'Work Ethic Skills', subCategories: [] },
    { name: 'Creative Skills', subCategories: [] },
  ]);

  db.skills.bulkPut([
    { name: "Python", category: ['Procedural Programming Languages', 'Object-Oriented Programming Languages', 'Functional Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Scripting Languages', 'Back-End Languages', 'High-Level Languages'], experienceLevel: [] },
    { name: "JavaScript", category: ['Procedural Programming Languages', 'Object-Oriented Programming Languages', 'Functional Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Scripting Languages', 'Front-End Languages', 'High-Level Languages',], experienceLevel: [] },
    { name: "TypeScript", category: ['Procedural Programming Languages', 'Object-Oriented Programming Languages', 'Functional Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Scripting Languages', 'Front-End Languages', 'High-Level Languages',], experienceLevel: [] },
    { name: "Java", category: ['Procedural Programming Languages', 'Object-Oriented Programming Languages', 'Functional Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Back-End Languages', 'High-Level Languages',], experienceLevel: [] },
    { name: "C#", category: ['Procedural Programming Languages', 'Object-Oriented Programming Languages', 'Functional Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Back-End Languages', 'High-Level Languages',], experienceLevel: [] },
    { name: "XAML", category: ["Languages", 'Markup Languages', 'Front-End Languages',], experienceLevel: [] },
    { name: ".NET", category: ['Libraries & Frameworks',], experienceLevel: [] },
    { name: "Visual Studio", category: ['IDEs & Code Editors',], experienceLevel: [] },
    { name: "WPF", category: ['GUI', 'Libraries & Frameworks',], experienceLevel: [] },
    { name: "C", category: ['Procedural Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Back-End Languages', 'Low-Level Languages'], experienceLevel: [] },
    { name: "Vim", category: ['IDEs & Code Editors',], experienceLevel: [] },
    { name: "Emacs", category: ['IDEs & Code Editors',], experienceLevel: [] },
    { name: "Eclipse", category: ['IDEs & Code Editors',], experienceLevel: [] },
    { name: "Maven", category: ['Automation',], experienceLevel: [] },
    { name: "JUnit", category: ['Automation', 'Libraries & Frameworks', 'Testing',], experienceLevel: [] },
    { name: "JavaFX", category: ['GUI', 'Libraries & Frameworks',], experienceLevel: [] },
    { name: "FXML", category: ["Languages", 'Front-End Languages', 'Markup Languages',], experienceLevel: [] },
    { name: "SPIM", category: ['Simulators',], experienceLevel: [] },
    { name: "MIPS", category: ['Hard Skills', 'Languages', 'Programming Languages', 'Assembly Languages',], experienceLevel: [] },
    { name: "LMC", category: ['Hard Skills', 'Languages', 'Programming Languages', 'Assembly Languages',], experienceLevel: [] },
    { name: "Kotlin", category: ['Procedural Programming Languages', 'Object-Oriented Programming Languages', 'Functional Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Back-End Languages', 'High-Level Languages',], experienceLevel: [] },
    { name: "Android Studio", category: ['IDEs & Code Editors',], experienceLevel: [] },
    { name: "AVD", category: ['Simulators',], experienceLevel: [] },
    { name: "OpenCV", category: ['Libraries & Frameworks', 'Machine Learning', 'Data Science Tools',], experienceLevel: [] },
    { name: "SQL", category: ["Languages", 'Query Languages', 'Data Definition Languages',], experienceLevel: [] },
    { name: "PostgreSQL", category: ["Languages", 'Query Languages', 'Data Definition Languages',], experienceLevel: [] },
    { name: "UML", category: ["Languages", 'Modelling Languages'], experienceLevel: [] },
    { name: "Visual Studio Code", category: ['IDEs & Code Editors',], experienceLevel: [] },
    { name: "XML", category: ["Languages", 'Markup Languages', 'Front-End Languages',], experienceLevel: [] },
    { name: "Git", category: ['Version Control',], experienceLevel: [] },
    { name: "GitHub", category: ['Version Control',], experienceLevel: [] },
    { name: "GitLab", category: ['Version Control',], experienceLevel: [] },
    { name: "Markdown", category: ["Languages", 'Markup Languages',], experienceLevel: [] },
    { name: "Terminal", category: ["CLI"], experienceLevel: [] },
    { name: "PowerShell", category: ['Object-Oriented Programming Languages', 'Procedural Programming Languages', "Languages", 'Scripting Languages',], experienceLevel: [] },
    { name: "Batch", category: ['Procedural Programming Languages', "Languages", 'Scripting Languages',], experienceLevel: [] },
    { name: "Docker", category: ['Runtime Environments'], experienceLevel: [] },
    { name: "Bun", category: ['Runtime Environments',], experienceLevel: [] },
    { name: "Node.js", category: ['Runtime Environments',], experienceLevel: [] },
    { name: "Deno", category: ['Runtime Environments',], experienceLevel: [] },
    { name: "React", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Astro", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Next.js", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Vue.js", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Nuxt", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Angular", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "htmx", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "TailwindCSS", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Express.js", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Svelte", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Flask", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Spring", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Nitro", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "SvelteKit", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Alpine.js", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "jQuery", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "Nginx", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "MongoDB", category: ['Databases', 'NoSQL'], experienceLevel: [] },
    { name: "Redis", category: ['Databases', 'NoSQL'], experienceLevel: [] },
    { name: "Valkey", category: ['Databases', 'NoSQL'], experienceLevel: [] },
    { name: "Electron", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "HTML", category: ["Languages", 'Front-End Languages',], experienceLevel: [] },
    { name: "CSS", category: ["Languages", 'Style Sheet Languages', 'Front-End Languages',], experienceLevel: [] },
    { name: "Sass", category: ["Languages", 'Style Sheet Languages', 'Front-End Languages',], experienceLevel: [] },
    { name: "Jupyter", category: ['Data Science Tools',], experienceLevel: [] },
    { name: "LibreOffice", category: ['Office Suites'], experienceLevel: [] },
    { name: "Microsoft Office", category: ['Office Suites'], experienceLevel: [] },
    { name: "Microsoft PowerPoint", category: ['Office Suites', 'Graphics'], experienceLevel: [] },
    { name: "Microsoft Word", category: ['Office Suites',], experienceLevel: [] },
    { name: "Microsoft Excel", category: ['Office Suites',], experienceLevel: [] },
    { name: "Microsoft OneNote", category: ['Office Suites',], experienceLevel: [] },
    { name: "Microsoft Outlook", category: ['Office Suites', 'Communication Tools'], experienceLevel: [] },
    { name: "Microsoft Access", category: ['Office Suites', 'Databases'], experienceLevel: [] },
    { name: "Microsoft Teams", category: ['Office Suites', 'Communication Tools'], experienceLevel: [] },
    { name: "Zoom", category: ['Communication Tools'], experienceLevel: [] },
    { name: "Adobe Photoshop", category: ['Office Suites', 'Adobe Suite', 'Graphics'], experienceLevel: [] },
    { name: "Adobe Illustrator", category: ['Office Suites', 'Adobe Suite', 'Graphics'], experienceLevel: [] },
    { name: "Adobe Premier Pro", category: ['Office Suites', 'Adobe Suite', 'Graphics'], experienceLevel: [] },
    { name: "Adobe XD", category: ['Office Suites', 'Adobe Suite', 'Graphics'], experienceLevel: [] },
    { name: "Adobe Acrobat Reader", category: ['Office Suites', 'Adobe Suite'], experienceLevel: [] },
    { name: "Blender", category: ['Graphics'], experienceLevel: [] },
    { name: "GIMP", category: ['Graphics'], experienceLevel: [] },
    { name: "Unity", category: ['Libraries & Frameworks'], experienceLevel: [] },
    { name: "WSL", category: ['Runtime Environments',], experienceLevel: [] },
    { name: "TeX / LaTeX", category: ['High-Level Languages', 'Markup Languages', "Languages",], experienceLevel: [] },
    { name: "Gleam", category: ['Functional Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Back-End Languages',], experienceLevel: [] },
    { name: "BEAM", category: ['Runtime Environments'], experienceLevel: [] },
    { name: "Haskell", category: ['Functional Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Back-End Languages',], experienceLevel: [] },
    { name: "Scala", category: ['Object-Oriented Programming Languages', 'Functional Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Back-End Languages',], experienceLevel: [] },
    { name: "SWI-Prolog", category: ['Logic Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages',], experienceLevel: [] },
    { name: "KLWP", category: ['Android Customization'], experienceLevel: [] },
    { name: "KWGT", category: ['Android Customization'], experienceLevel: [] },
    { name: "Total Launcher", category: ['Android Customization'], experienceLevel: [] },
    { name: "Nova Launcher", category: ['Android Customization'], experienceLevel: [] },
    { name: "Kvaesitso", category: ['Android Customization'], experienceLevel: [] },
    { name: "Rainmeter", category: ['Windows Customization',], experienceLevel: [] },
    { name: "Linux", category: ['Operating Systems'], experienceLevel: [] },
    { name: "Windows", category: ['Operating Systems'], experienceLevel: [] },
    { name: "Android", category: ['Operating Systems'], experienceLevel: [] },
    { name: "Dart", category: ['Procedural Programming Languages', 'Object-Oriented Programming Languages', 'Hard Skills', 'Languages', 'Programming Languages', 'Back-End Languages', 'High-Level Languages',], experienceLevel: [] },
    { name: "Flutter", category: ['Libraries & Frameworks'], experienceLevel: [] },
    //
    { name: "Active Listening", category: ['Communication Skills'], experienceLevel: [] },
    { name: "Public Speaking", category: ['Communication Skills'], experienceLevel: [] },
    { name: "Written Communication", category: ['Communication Skills'], experienceLevel: [] },
    { name: "Nonverbal Communication", category: ['Communication Skills'], experienceLevel: [] },
    { name: "Empathy", category: ['Communication Skills'], experienceLevel: [] },
    { name: "Clarity and Conciseness", category: ['Communication Skills'], experienceLevel: [] },
    { name: "Persuasion", category: ['Communication Skills'], experienceLevel: [] },
    { name: "Presenting", category: ['Communication Skills'], experienceLevel: [] },
    { name: "Conflict Management / Resolution", category: ['Communication Skills', 'Leadership Skills'], experienceLevel: [] },
    { name: "Giving and Receiving Feedback", category: ['Communication Skills'], experienceLevel: [] },
    { name: "Collaboration", category: ['Teamwork Skills'], experienceLevel: [] },
    { name: "Reliability", category: ['Teamwork Skills'], experienceLevel: [] },
    { name: "Emotional Intelligence", category: ['Teamwork Skills'], experienceLevel: [] },
    { name: "Flexibility / Adaptability", category: ['Teamwork Skills', 'Leadership Skills', 'Creative Skills'], experienceLevel: [] },
    { name: "Constructive Feedback", category: ['Teamwork Skills'], experienceLevel: [] },
    { name: "Respectfulness", category: ['Teamwork Skills'], experienceLevel: [] },
    { name: "Responsibility", category: ['Teamwork Skills'], experienceLevel: [] },
    { name: "Interpersonal", category: ['Teamwork Skills'], experienceLevel: [] },
    { name: "Cultural Awareness", category: ['Teamwork Skills'], experienceLevel: [] },
    { name: "Supportiveness", category: ['Teamwork Skills'], experienceLevel: [] },
    { name: "Critical Thinking", category: ['Problem-Solving Skills'], experienceLevel: [] },
    { name: "Analytical", category: ['Problem-Solving Skills'], experienceLevel: [] },
    { name: "Creativity", category: ['Problem-Solving Skills'], experienceLevel: [] },
    { name: "Decision Making", category: ['Problem-Solving Skills', 'Leadership Skills'], experienceLevel: [] },
    { name: "Research", category: ['Problem-Solving Skills'], experienceLevel: [] },
    { name: "Attention to Detail", category: ['Problem-Solving Skills', 'Work Ethic Skills'], experienceLevel: [] },
    { name: "Logical Reasoning", category: ['Problem-Solving Skills'], experienceLevel: [] },
    { name: "Resourcefulness", category: ['Problem-Solving Skills'], experienceLevel: [] },
    { name: "Troubleshooting", category: ['Problem-Solving Skills'], experienceLevel: [] },
    { name: "Risk Assessment", category: ['Problem-Solving Skills'], experienceLevel: [] },
    { name: "Strategic Thinking", category: ['Leadership Skills'], experienceLevel: [] },
    { name: "Delegation", category: ['Leadership Skills'], experienceLevel: [] },
    { name: "Motivating Others", category: ['Leadership Skills'], experienceLevel: [] },
    { name: "Accountability", category: ['Leadership Skills', 'Work Ethic Skills'], experienceLevel: [] },
    { name: "Vision Setting", category: ['Leadership Skills'], experienceLevel: [] },
    { name: "Coaching and Mentoring", category: ['Leadership Skills'], experienceLevel: [] },
    { name: "Initiative", category: ['Leadership Skills'], experienceLevel: [] },
    { name: "Time Management", category: ['Work Ethic Skills'], experienceLevel: [] },
    { name: "Dependability", category: ['Work Ethic Skills'], experienceLevel: [] },
    { name: "Self-Motivation", category: ['Work Ethic Skills'], experienceLevel: [] },
    { name: "Discipline", category: ['Work Ethic Skills'], experienceLevel: [] },
    { name: "Integrity", category: ['Work Ethic Skills'], experienceLevel: [] },
    { name: "Professionalism", category: ['Work Ethic Skills'], experienceLevel: [] },
    { name: "Persistence", category: ['Work Ethic Skills'], experienceLevel: [] },
    { name: "Commitment to Excellence", category: ['Work Ethic Skills'], experienceLevel: [] },
    { name: "Idea Generation", category: ['Creative Skills', 'Problem-Solving Skills'], experienceLevel: [] },
    { name: "Innovation", category: ['Creative Skills', 'Problem-Solving Skills'], experienceLevel: [] },
    { name: "Storytelling", category: ['Creative Skills'], experienceLevel: [] },
    { name: "Visual Communication", category: ['Creative Skills', 'Communication Skills'], experienceLevel: [] },
    { name: "Imagination", category: ['Creative Skills'], experienceLevel: [] },
    { name: "Experimentation", category: ['Creative Skills'], experienceLevel: [] },
    { name: "English", category: ['Spoken Languages', 'Romance languages (Latin Languages)'], experienceLevel: [] },
  ]);

  db.linkTypes.bulkPut([
    { name: "Source" },
    { name: "Site" },
    { name: "Organization" },
    { name: "Docs" },
    { name: "Other" },
    { name: "Details" },
  ])

  db.links.bulkPut([
    { url: "https://www.heathland.hounslow.sch.uk/", type: 'Organization' },
    { url: "https://www.royalholloway.ac.uk/", type: 'Organization' },
    { url: 'https://web.archive.org/web/20240618113322/https://www.royalholloway.ac.uk/studying-here/undergraduate/computer-science/computer-science-software-engineering/#', type: 'Details' }
  ])

  db.organizations.bulkPut([
    { name: "Royal Holloway, University of London", roles: [7], locations: ['Egham, Surrey, United Kingdom', 'In-Person'], links: ['https://www.royalholloway.ac.uk/'] },
    { name: "The Heathland School", roles: [7], locations: ['Hounslow, Greater London, United Kingdom', 'In-Person'], links: ['https://www.heathland.hounslow.sch.uk/'] },
    { name: "freeCodeCamp", roles: [11], locations: ['Online'], links: ['https://www.freecodecamp.org/'] },
    { name: "Microsoft", roles: [11], locations: ['Online'], links: ['https://www.microsoft.com/'] },
    { name: "UKMT", roles: [11], locations: ['In-Person'], links: ['https://www.ukmt.org.uk/'] },
    { name: "Mimo", roles: [11], locations: ['Online'], links: ['https://www.mimo.org/'] },
    { name: "Royal Institution", roles: [11], locations: ['Online'], links: ['https://www.rigb.org/'] },
  ])

  db.certificates.bulkPut([
    {
      name: "BSc Hons. Computer Science (Software Engineering)",
      description: "My Bachelor's Degree in Software Engineering from Royal Holloway, University of London",
      organization: ['Royal Holloway, University of London'],
      links: ['https://web.archive.org/web/20240618113322/https://www.royalholloway.ac.uk/studying-here/undergraduate/computer-science/computer-science-software-engineering/#'],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Bachelor\'s Degree Certificate front side.jpg',
        '/PersonalSite2026/media/portfolio/Faeq Faisal Bachelor\'s Degree Transcript page 1.png',
        '/PersonalSite2026/media/portfolio/Faeq Faisal Bachelor\'s Degree Transcript page 2.png'
      ],
      skills: [
        'Python', 'JavaScript', 'TypeScript', 'Java', 'C',
        "Eclipse", "Maven", "JUnit", "JavaFX", "FXML", "SPIM", "MIPS", "LMC", "SQL",
        "PostgreSQL", "UML", "Visual Studio Code", "XML", "Git", "GitLab", "Markdown",
        "Terminal", "Node.js", "React", "Next.js", "htmx", "TailwindCSS", "Express.js",
        "Svelte", "Spring", "SvelteKit", "Alpine.js", "Nginx", "MongoDB", "Redis",
        "Valkey", "HTML", "CSS", "Sass", "Jupyter", "Microsoft Office", "WSL",
        "Microsoft PowerPoint", "TeX / LaTeX", "Gleam", "Linux", "Windows", "BEAM",
        "Haskell", "Scala", "SWI-Prolog", "Microsoft Word", "Microsoft Excel",
        "Microsoft OneNote", "Microsoft Outlook", "Microsoft Access", "Microsoft Teams",
        //
        "Active Listening", "Empathy", "Clarity and Conciseness", "Persuasion",
        "Presenting", "Conflict Management / Resolution", "Giving and Receiving Feedback",
        "Public Speaking", "Collaboration", "Emotional Intelligence", "Flexibility / Adaptability",
        "Reliability", "Constructive Feedback", "Respectfulness", "Cultural Awareness",
        "Responsibility", "Supportiveness", "Critical Thinking", "Analytical",
        "Creativity", "Decision Making", "Research", "Attention to Detail",
        "Interpersonal", "Logical Reasoning", "Resourcefulness", "Motivating Others",
        "Troubleshooting", "Risk Assessment", "Accountability", "Vision Setting",
        "Strategic Thinking", "Delegation", "Coaching and Mentoring", "Initiative",
        "Written Communication", "Time Management", "Dependability", "Self-Motivation",
        "Nonverbal Communication", "Discipline", "Integrity", "Storytelling",
        "Professionalism", "Commitment to Excellence", "Idea Generation",
        "Persistence", "Visual Communication", "Imagination", "Experimentation",
        "English",
      ],
      awarded: new Date('August 2025'),
      isFeatured: true
    },
    {
      name: "A Level (Advanced GCE) in Computer Science and Physics",
      description: 'My A Level qualification in Computer Science and Physics',
      organization: ['The Heathland School'],
      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal A Level Computer Science and Physics Certificate page 1.jpg',
        '/PersonalSite2026/media/portfolio/Faeq Faisal A Level Computer Science and Physics Certificate page 2.jpg',
      ],
      skills: [''],
      awarded: new Date('September 2022')
    },
    {
      name: "A Level (Advanced GCE) in Mathematics",
      description: 'My A Level qualification in Mathematics',
      organization: ['The Heathland School'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal A Level Mathematics Certificate page 1.jpg',
        '/PersonalSite2026/media/portfolio/Faeq Faisal A Level Mathematics Certificate page 2.jpg',
      ],
      skills: [''],
      awarded: new Date('September 2022')
    },
    {
      name: "GCSE in Spanish",
      description: 'My GCSE qualification in Spanish',
      organization: ['The Heathland School'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal GCSE Spanish Certificate page 1.jpg',
        '/PersonalSite2026/media/portfolio/Faeq Faisal GCSE Spanish Certificate page 2.jpg',
      ],
      skills: [''],
      awarded: new Date('September 2020')
    },
    {
      name: "GCSE in Biology, Chemistry and Physics (Triple Science)",
      description: 'My GCSE qualification in Biology, Chemistry and Physics (Triple Science)',
      organization: ['The Heathland School'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal GCSE Biology%2C Chemistry and Physics Certificate page 1.jpg',
        '/PersonalSite2026/media/portfolio/Faeq Faisal GCSE Biology%2C Chemistry and Physics Certificate page 2.jpg'
      ],
      skills: [''],
      awarded: new Date('September 2020')
    },
    {
      name: "GCSE in Geography, Religious Studies and Mathematics",
      description: 'My GCSE qualification in Geography, Religious Studies and Mathematics',
      organization: ['The Heathland School'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal GCSE Geography%2C Religious Studies and Mathematics Certificate page 1.jpg',
        '/PersonalSite2026/media/portfolio/Faeq Faisal GCSE Geography%2C Religious Studies and Mathematics Certificate page 2.jpg',
      ],
      skills: [''],
      awarded: new Date('October 2020')
    },
    {
      name: "GCSE in Computer Science, English Language and English Literature",
      description: 'My GCSE qualification in Computer Science, English Language and English Literature',
      organization: ['The Heathland School'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal GCSE Computer Science%2C English Language and English Literature Certificate page 1.jpg',
        '/PersonalSite2026/media/portfolio/Faeq Faisal GCSE Computer Science%2C English Language and English Literature Certificate page 2.jpg',
      ],
      skills: [''],
      awarded: new Date('September 2020')
    },
    {
      name: "UKMT Senior Mathematical Challenge 2020 - Bronze",
      description: 'My Bronze certificate from the UKMT Senior Mathematical Challenge in 2020',
      organization: ['UKMT', 'The Heathland School'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal UKMT Senior Mathematical Challenge 2020 Certificate.jpg',
      ],
      skills: [''],
      awarded: new Date('February 2020')
    },
    {
      name: "Foundational C# with Microsoft",
      description: 'My Foundational C# with Microsoft certificate from completing a course on freeCodeCamp',
      organization: ['freeCodeCamp', 'Microsoft'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal freeCodeCamp Foundational C%23 with Microsoft Certificate.png',
      ],
      skills: [''],
      awarded: new Date('September 2023')
    },
    {
      name: "Cisco Pathway To Your Furture Work Experience",
      description: '',
      organization: [''],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Cisco Pathway To Your Furture Work Experience Certificate.jpg',
      ],
      skills: [''],
      awarded: new Date('February 2022')
    },
    {
      name: "Mimo Web Development Course",
      description: 'Completed a curriculum covering the core concepts of using JavaScript, HTML and CSS to create web pages. Included the practical experience needed to combine these technologies and publish a website on the internet.',
      organization: ['Mimo'],
      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Mimo Web Development Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('November 2022')
    },
    {
      name: "Royal Institution Computer Science Masterclasses",
      description: 'Attended the 2020 - 2021 University of Kent Sixth Form Computer Science Masterclasses, provided by the Royal Institution. Learnt about the future of computing!',
      organization: ['Royal Institution'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Royal Institution Computer Science Masterclasses Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('July 2021')
    },
    {
      name: "Siemens Work Experience",
      description: 'Completed a virtual work experience program with Siemens, via Springpod, gaining insights into the world of engineering and technology.',
      organization: ['Siemens', 'Springpod'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Springpod Siemens Work Experience Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('June 2023')
    },
    {
      name: "Science engineering & IT work experience cert",
      description: 'Completed Science, Engineering & IT Work Experience with Young Professionals, learning about the various pathways into the industry and the skills needed to succeed.',
      organization: [''],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Science, Engineering & IT Work Experience Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('April 2023')
    },
    {
      name: "Mimo Become a Hacker Course",
      description: 'Developed an understanding of the skills required for white hat hacking, such as Cryptography, SQL, and identifying password weaknesses. I also gained the practical knowledge required to apply these techniques and reveal vulnerabilities within websites.',
      organization: ['Mimo'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Mimo Become a hacker Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('October 2019')
    },
    {
      name: "Mimo React Course",
      description: 'Completed a curriculum that provided an understanding of the core concepts needed for React, including experience calling external APIs and practice with React hooks and other React APIs.',
      organization: ['Mimo'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Mimo React Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('February 2025')
    },
    {
      name: "Mimo Front-End Development Course",
      description: 'Learnt HTML essentials, CSS techniques for styling web pages and Core JavaScript programming concepts for single-page application development with React.',
      organization: ['Mimo'],
      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Mimo Front-End Development Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('February 2025')
    },
    {
      name: "Google AI and Productivity",
      description: '',
      organization: [''],
      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Santander Open Academy Google AI and Productivity Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('August 2024')
    },
    {
      name: "Microsoft Copilot Productivity",
      description: '',
      organization: [''],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Santander Open Academy Microsoft Copilot Productivity Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('August 2024')
    },
    {
      name: "make a website cert",
      description: '',
      organization: [''],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Mimo Make a Website Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('October 2019')
    },
    {
      name: "tech the future cert",
      description: '',
      organization: [''],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Tech the Future Work Experience Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('April 2022')
    },
    {
      name: "tech the future insight cert",
      description: '',
      organization: [''],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Tech the Future Insight Evening Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('September 2021')
    },
    {
      name: "Young Professionals Careers in Technology event",
      description: 'Attended an event held by Young Professionals, learning about what it is like to work in the industry',
      organization: ['Young Professionals'],

      links: [''],
      images: [
        '/PersonalSite2026/media/portfolio/Faeq Faisal Careers in Technology Certificate.jpg'
      ],
      skills: [''],
      awarded: new Date('September 2022')
    },
  ])

  db.projects.bulkPut([
    {
      name: "My Phone",
      description: 'Customizing my Phone',
      links: [''],
      skills: ['Nova Launcher', 'Kvaesitso', 'Total Launcher', 'KLWP', 'KWGT', 'Android'],
      images: [
        '/PersonalSite2026/media/portfolio/PhoneSetup1.png',
        '/PersonalSite2026/media/portfolio/PhoneSetup2.png',
        '/PersonalSite2026/media/portfolio/PhoneSetup3.png',
        '/PersonalSite2026/media/portfolio/PhoneSetup4.png',
        '/PersonalSite2026/media/portfolio/PhoneSetup5.png',
        '/PersonalSite2026/media/portfolio/PhoneSetup6.png',
        '/PersonalSite2026/media/portfolio/PhoneSetup7.png',
        '/PersonalSite2026/media/portfolio/PhoneSetup8.jpg',
        '/PersonalSite2026/media/portfolio/PhoneSetup9.png',
        '/PersonalSite2026/media/portfolio/PhoneSetup10.png',
      ],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [],
      relatedProjects: ['My Desktop']
    },
    {
      name: "My Desktop",
      description: 'Customizing my Desktop',
      links: [''],
      skills: ['Rainmeter', 'Windows', 'PowerShell', 'OhMyPosh', 'WindowsTerminalTheme'],
      images: [],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [],
      relatedProjects: ['My Phone']
    },
    {
      name: "Zarlasht",
      description: 'My dissertation. Includes 6 programs total; Online Chat (JS & Erl targets), Tic-Tac-Toe (JS & Erl targets), Pong (Erl target) & Zarlasht (Erl target)',
      links: ['https://github.com/Faeq-F/Zarlasht'],
      skills: [
        'JavaScript', 'HTML', 'CSS', 'Git', 'GitHub', 'TeX / LaTeX', 'UML', "XML",
        "GitLab", "Markdown", "Terminal", "Deno", "htmx", "Alpine.js", "jQuery",
        "Nginx", "Redis", "Sass", "GIMP", "WSL", "Gleam", "BEAM", "Linux",
        "Windows", "Valkey", "TailwindCSS", "Visual Studio Code",
        //
        "Active Listening", "Giving and Receiving Feedback", "Respectfulness",
        "Responsibility", "Critical Thinking", "Analytical", "Resourcefulness",
        "Troubleshooting", "Risk Assessment", "Strategic Thinking",
        "Creativity", "Decision Making", "Research", "Accountability",
        "Public Speaking", "Presenting", "Reliability", "Logical Reasoning",
        "Written Communication", "Clarity and Conciseness", "Vision Setting",
        "Initiative", "Time Management", "Dependability", "Self-Motivation",
        "Discipline", "Commitment to Excellence", "Idea Generation",
        "Integrity", "Innovation", "Storytelling", "Visual Communication",
        "Professionalism", "Experimentation", "English", "Persistence",
      ],
      images: [
        '/PersonalSite2026/media/portfolio/Zarlasht_DemonstrationPoster.jpg',
        '/PersonalSite2026/media/portfolio/Zarlasht_home.png',
        '/PersonalSite2026/media/portfolio/Zarlasht_initialPlayScreen.png',
        '/PersonalSite2026/media/portfolio/Zarlasht_joinGame.png',
        '/PersonalSite2026/media/portfolio/Zarlasht_EncounteredEnemyTribe.png',
        '/PersonalSite2026/media/portfolio/Zarlasht_rollingBattleDice.png',
        '/PersonalSite2026/media/portfolio/Zarlasht_multiplePlayers-mapTraversal.png',
        '/PersonalSite2026/media/portfolio/Zarlasht_Pong-POC.png',
        '/PersonalSite2026/media/portfolio/Zarlasht_Pong-leaderboard-POC.png',
        '/PersonalSite2026/media/portfolio/Zarlasht_TicTacToe-POC.png',
        '/PersonalSite2026/media/portfolio/Zarlasht_OnlineChat-POC.png',
        '/PersonalSite2026/media/portfolio/Zarlasht_Leaderboard.png',
      ],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: [''],
      isFeatured: true
    },
    {
      name: "Muslim Guide", description: 'Duas and Umrah, Hajj & Madinah Guides',
      links: ['https://github.com/Faeq-F/MuslimGuide'],
      skills: ['Git', 'GitHub'],
      images: [
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Home.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Search.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Guides.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Duas.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Settings.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Home-SetName.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Dua-example.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Guide-example.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Guide-content-example.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Guide-content-example2.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Guide-content-example3.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Mobile-Guide-content-example4.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Desktop-Home.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Desktop-Search.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Desktop-Guides.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Desktop-Duas.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Desktop-Settings.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Desktop-Dua-example.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Desktop-Guide-example.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Desktop-Guide-content-example.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Desktop-Guide-content-example2.png',
        '/PersonalSite2026/media/portfolio/MuslimGuide-Desktop-Guide-content-example3.png',
      ],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "IT Assets Metadata Repository",
      description: 'A holistic Web-based system that supports the metadata-based organization of different source-code related assets',
      links: ['https://github.com/Faeq-F/IT-Assets-Metadata-Repository'],
      skills: ['Svelte', 'TailwindCSS', 'TypeScript', 'Node.js', 'Git', 'GitHub'],
      images: [
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_Architecture_(Package Diagram).drawio.svg',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_home.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_AdminAccount.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_account.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_Assets.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_AssetTypes.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_AuditTrail.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_MakeAsset.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_MakeAssetType.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_ExpandAsset.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_EditAssetType.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_filterAssets.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_searchAssets.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_ManagePermissions.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_MakeDiscussionBoard.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_MakeDiscussionBoardContainer.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_discussionBoards.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_DiscussionBoardMenu.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_discussionBoardExample.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_DiscussionBoardContentExample.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_DiscussionBoardContainers.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_graphsOnHome.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_InitialDependencyGraph.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_ExpandedDependencyGraph.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_sequenceDiagramExample_creatingAssets&creatingTypes.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_login.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_signup.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_SystemAssets.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_Menus.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_docs.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_docs2.png',
        '/PersonalSite2026/media/portfolio/IT-Assets-Metadata-Repository_Database.svg',
      ],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: [''],
      isFeatured: true
    },
    {
      name: "ALSET",
      description: 'Track following robot using the EV3 kit, LeJOS (Java for Lego Mindstorms) and an Android phone',
      links: ['https://github.com/Faeq-F/ALSET'],
      skills: ['Java', 'Android Studio', 'Git', 'GitHub'],
      images: [
        "/PersonalSite2026/media/portfolio/ALSET.png",
        "/PersonalSite2026/media/portfolio/ALSET2.png",
        "/PersonalSite2026/media/portfolio/ALSET calibration instructions screen.png",
        "/PersonalSite2026/media/portfolio/ALSET followTrack screen.png",
        "/PersonalSite2026/media/portfolio/ALSET Pause in followtrack.png",
        "/PersonalSite2026/media/portfolio/ALSET welcome screen.png",
        "/PersonalSite2026/media/portfolio/ALSET Control Flow.drawio.png",
        "/PersonalSite2026/media/portfolio/ALSET app.jpg"
      ],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4], relatedProjects: ['']
    },
    {
      name: "Quokka",
      description: 'An extremely customizable keystroke launcher with plugins',
      links: [
        'https://faeq-f.github.io/Quokka/',
        'https://github.com/Faeq-F/Quokka'
      ],
      skills: [
        'C#', '.NET', 'WPF', 'XAML', 'JSON', 'Visual Studio', 'Git', 'GitHub', 'Markdown', 'Windows'
      ],
      images: [
        '/PersonalSite2026/media/portfolio/Quokka_AllApps.png',
        '/PersonalSite2026/media/portfolio/Quokka_CommandSignifiers.png',
        '/PersonalSite2026/media/portfolio/Quokka_ContextPanes.png',
        '/PersonalSite2026/media/portfolio/Quokka_FuzzySearching.png',
      ],
      startDate: new Date("January 2020"), endDate: new Date("December 2019"),
      relatedActivities: [],
      relatedProjects: [],
      isFeatured: true
    },
    {
      name: "WhatsappPortable", description: 'A portable application to use WhatsApp',
      links: ['https://github.com/Faeq-F/whatsappPortable'],
      skills: [
        'Flutter', 'Dart', 'CSS', 'JavaScript', 'HTML', 'Git', 'GitHub',
      ],
      images: [
        'https://raw.githubusercontent.com/Faeq-F/whatsappPortable/refs/heads/main/docs/WhatsappPortable.png',
        'https://raw.githubusercontent.com/Faeq-F/whatsappPortable/refs/heads/main/docs/WhatsappPortable-Dark.png',
        'https://raw.githubusercontent.com/Faeq-F/whatsappPortable/refs/heads/main/docs/WhatsappPortable-Login.png',
        'https://raw.githubusercontent.com/Faeq-F/whatsappPortable/refs/heads/main/docs/WhatsappPortable-MultipleAccounts.png',
        'https://raw.githubusercontent.com/Faeq-F/whatsappPortable/refs/heads/main/docs/WhatsappPortable-Settings.png',
        'https://raw.githubusercontent.com/Faeq-F/whatsappPortable/refs/heads/main/docs/WhatsappPortable-SettingsDark.png',
      ],
      startDate: new Date('June 2024'), endDate: new Date('"December 2023"'),
      relatedActivities: [],
      relatedProjects: [],
      isFeatured: true
    },
    {
      name: "My Personal Site",
      description: 'This Site!',
      links: [
        'https://github.com/Faeq-F/faeq-f.github.io',
        'https://faeq-f.github.io'
      ],
      skills: ['Nuxt', 'Vue.js', 'TypeScript', 'TailwindCSS', 'Sass', 'Git', 'GitHub'],
      images: ['/PersonalSite2026/media/PersonalSite2020.png', '/PersonalSite2026/media/PersonalSite2021.png', '/PersonalSite2026/media/PersonalSite2022.png', '/PersonalSite2026/media/PersonalSite2023.png', '/PersonalSite2026/media/PersonalSite2022dark.png', '/PersonalSite2026/media/PersonalSite2023dark.png'],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Dynamic Memory Allocator Simulator",
      description: 'A program that simulates a dynamic memory allocator',
      links: ['https://github.com/Faeq-F/DynamicMemoryAllocatorSimulator'],
      skills: ['C', 'Git', 'GitHub'],
      images: ['/PersonalSite2026/media/portfolio/DynamicMemoryAllocatorSimulator.png'],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: [''],
      isFeatured: true
    },
    {
      name: "Notes",
      description: 'Notes written for a variety of topics; lectures at university, advanced topic talks given by guests, etc.',
      links: ['https://github.com/Faeq-F/Notes'],
      skills: ['Markdown', 'TeX / LaTeX', 'Git', 'GitHub'],
      images: [
        '/PersonalSite2026/media/portfolio/ExampleNotes1.png',
        '/PersonalSite2026/media/portfolio/ExampleNotes2.png',
        '/PersonalSite2026/media/portfolio/ExampleNotes3.png',
        '/PersonalSite2026/media/portfolio/ExampleNotes4.png'
      ],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "LLM 2 Leaf",
      description: 'Convert your LLM usage to planting trees',
      links: ['https://github.com/Faeq-F/LLM-2-Leaf'],
      skills: [
        'Git', 'GitHub', "TypeScript", "Visual Studio Code", "XML", "Markdown",
        "Terminal", "Node.js", "Vue.js", "Python", "TailwindCSS", "Express.js",
        "jQuery", "MongoDB", "HTML", "Microsoft PowerPoint", "Microsoft Office",
        "CSS", "Windows",
        //
        "Active Listening", "Nonverbal Communication", "Empathy",
        "Public Speaking", "Persuasion", "Collaboration", "Cultural Awareness",
        "Reliability", "Giving and Receiving Feedback", "Constructive Feedback",
        "Presenting", "Emotional Intelligence", "Flexibility / Adaptability",
        "Respectfulness", "Supportiveness", "Critical Thinking", "Research",
        "Responsibility", "Analytical", "Logical Reasoning", "Strategic Thinking",
        "Creativity", "Resourcefulness", "Motivating Others", "Initiative",
        "Troubleshooting", "Delegation", "Vision Setting", "Time Management",
        "Interpersonal", "Dependability", "Discipline", "Persistence",
        "Integrity", "Commitment to Excellence", "Idea Generation",
        "Self-Motivation", "Storytelling", "Visual Communication", "Experimentation",
        "English",
      ],
      images: [
        '/PersonalSite2026/media/portfolio/LLM2LEAF_wonVerdn.jpg',
        '/PersonalSite2026/media/portfolio/LLM2LEAF-groupPhoto2.jpg',
        '/PersonalSite2026/media/portfolio/LLM2LEAF-groupPhoto1.jpg',
        '/PersonalSite2026/media/portfolio/LLM2LEAF_Chat.jpg',
        '/PersonalSite2026/media/portfolio/LLM2LEAF_Offset carbon footprint.jpg',
        '/PersonalSite2026/media/portfolio/LLM2LEAF presentation.jpg',
        '/PersonalSite2026/media/portfolio/LLM2LEAF_Statistics.jpg',
        '/PersonalSite2026/media/portfolio/LLM2LEAF_chatting.png'
      ],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: [''],
      isFeatured: true
    },
    {
      name: "Generic social media app",
      description: '',
      links: [''],
      skills: ['Java', 'SQL', 'Git', 'GitHub'],
      images: [],
      startDate: new Date(),
      endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Tool Customizations",
      description: 'Setting files and other resources for my terminal, text editor, etc.',
      links: ['https://github.com/Faeq-F/ToolCustomizations'],
      skills: ['Vim', 'PowerShell', 'Git', 'GitHub'],
      images: ['/PersonalSite2026/media/portfolio/ToolCustomizations-terminal.png'],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Partial Scroll",
      description: 'A demo webpage where, in a section of the page, only one half of the page scrolls, with static content on the other half',
      links: ['https://github.com/Faeq-F/PartialScroll'],
      skills: ['HTML', 'CSS', 'Git', 'GitHub'],
      images: ['https://raw.githubusercontent.com/Faeq-F/PartialScroll/refs/heads/main/Screenshot.png'],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "JavaFX Calculator",
      description: 'A calculator that can evaluate expressions in both infix and postfix notation',
      links: ['https://github.com/Faeq-F/JavaFX-Calculator'],
      skills: ['Java', 'JavaFX', 'FXML', 'Eclipse', 'Git', 'GitHub'],
      images: [],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "JavaFX Minimal Navigation example",
      description: 'An example of navigating between scenes in JavaFX',
      links: ['https://github.com/Faeq-F/JavaFX-MinimalNavExample'],
      skills: ['Java', 'JavaFX', 'FXML', 'Eclipse', 'Git', 'GitHub'],
      images: [],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Business Card",
      description: 'My Business Card (An Android app)',
      links: ['https://github.com/Faeq-F/BusinessCard'],
      skills: ['Android Studio', 'Java', 'Git', 'GitHub'],
      images: [],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Browser Home page",
      description: 'Simple home page for your browser',
      links: ['https://github.com/Faeq-F/Browser-Home-Page'],
      skills: ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'],
      images: [],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Hackaway v7 Sign-up Page",
      description: 'Get to our Royal Hackaway V7 project',
      links: ['https://github.com/Faeq-F/HackawayV7'],
      skills: ['Flask', 'Python', 'HTML', 'CSS', 'JavaScript', 'Git', 'GitHub'],
      images: [],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "OhMyPosh Windows Terminal Theme",
      description: 'My Windows terminal theme - using OhMyPosh',
      links: ['https://github.com/Faeq-F/WindowsTerminalTheme'],
      skills: ['PowerShell', 'Windows', 'Git', 'GitHub'],
      images: [],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Gideon",
      description: 'An automated personal assistant',
      links: ['https://github.com/Faeq-F/Gideon'],
      skills: ['Git', 'GitHub'],
      images: [],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Ascii Art viewer",
      description: 'An ASCII art viewer that can also compress the files using Run Length Encoding',
      links: ['https://github.com/Faeq-F/ASCII-art-viewer'],
      skills: ['GitHub'],
      images: [
        "/PersonalSite2026/media/portfolio/ASCII pHome.PNG",
        "/PersonalSite2026/media/portfolio/ASCII pLoadArt.PNG",
        "/PersonalSite2026/media/portfolio/ASCII pArt.PNG",
        "/PersonalSite2026/media/portfolio/ASCII pEnterRLE.PNG",
        "/PersonalSite2026/media/portfolio/ASCII Overall Flowchart (vertically).png",
        "/PersonalSite2026/media/portfolio/ASCII Decomposition diagram.png"
      ],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "WRDSRCH",
      description: 'A Wordsearch solver',
      links: ['https://github.com/Faeq-F/WRDSRCH'],
      skills: ['Java', 'Android Studio', 'Git', 'GitHub'],
      images: ["/PersonalSite2026/media/portfolio/WRDSRCH demo.png"],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Portable Application Launcher",
      description: 'A launcher for portable apps on your usb drive or computer',
      links: ['https://github.com/Faeq-F/Portable-Application-Launcher'],
      skills: ['GitHub'],
      images: ["/PersonalSite2026/media/portfolio/launcherScreenshot1.png", "/PersonalSite2026/media/portfolio/launcherScreenshot2.png"],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    { name: "soulmate finder", description: '', links: [''], skills: ['GitHub'], images: [], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    { name: "databse x2 ??", description: '', links: [''], skills: ['GitHub'], images: [], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    { name: "pathfinding", description: '', links: [''], skills: ['GitHub'], images: [], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    { name: "trading card??", description: '', links: [''], skills: ['GitHub'], images: [], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    { name: "album cover", description: '', links: [''], skills: ['GitHub'], images: [], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    { name: "book system??", description: '', links: [''], skills: ['GitHub'], images: [], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
  ])

  db.roleCategories.bulkPut([
    { name: "jobs", skills: [''] },
    { name: "education", skills: [''] },
    { name: "volunteering", skills: [''] },
    { name: "events", skills: [''] },
    { name: "projects", skills: [''] },
  ])

  db.modules.bulkPut([
    { organization: [''], name: "", code: "", grade: "", year: "" },
  ])

  db.roles.bulkPut([
    {
      id: 0, organization: ['The Heathland School'], name: "GCSEs",
      type: 'education', category: [''],
      startDate: new Date("September 2018"),
      endDate: new Date("June 2020"),
      description: 'Studied 10 GCSEs including; Computer Science (9), Mathematics (7), Physics (7), English (7), Biology (8)',
      links: [''],
      skills: [
        'Python', 'JavaScript', 'LMC', 'SQL', 'Terminal', 'HTML', 'CSS',
        'LibreOffice', "Microsoft Office", "Microsoft PowerPoint",
        "Microsoft Word", "Microsoft Excel", "Microsoft OneNote",
        "Microsoft Outlook", "Microsoft Access", "Microsoft Teams",
        "Adobe Photoshop", "Adobe Illustrator", "Adobe Premier Pro",
        "Adobe XD", "Adobe Acrobat Reader", "Blender", "GIMP", "Unity",
        "Windows", "Linux", "Written Communication", "Clarity and Conciseness",
        "Presenting", "Conflict Management / Resolution", "Giving and Receiving Feedback",
        "Collaboration", "Constructive Feedback", "Respectfulness", "Responsibility",
        "Critical Thinking", "Analytical", "Creativity", "Decision Making", "Research",
        "Logical Reasoning", "Troubleshooting", "Accountability", "Initiative",
        "Time Management", "Self-Motivation", "Discipline", "Integrity",
        "Persistence", "Commitment to Excellence", "Visual Communication",
        "Storytelling", "Imagination", "English", "Interpersonal",
      ],
      modules: [''], locations: [''], relatedActivities: [2]
    },
    {
      id: 1, organization: [], name: "Quokka",
      type: 'projects', category: [''],
      startDate: new Date("January 2020"),
      endDate: new Date("December 2019"),
      description: 'A lightweight, customizable keystroke launcher in C#, C++, WPF and .NET. Enables diverse, flexible workflows via a plugin-driven design, enabling users to extend functionality according to unique needs. Accompanied by default plugins.',
      links: [''],
      skills: [
        'C#', '.NET', 'WPF', 'XAML', 'JSON', 'Visual Studio', 'Git', 'GitHub', 'Markdown', 'Windows'
      ], modules: [''], locations: [''], relatedActivities: [2]
    },
    {
      id: 2, organization: ['The Heathland School'], name: "A-levels",
      type: 'education', category: [''],
      startDate: new Date("September 2020"),
      endDate: new Date("June 2022"),
      description: 'Studied 3 A-Levels; Computer Science (A), Mathematics (B), Physics (C)',
      links: [''],
      skills: [''],
      modules: [''], locations: [''], relatedActivities: [0, 1]
    },
    {
      id: 3, organization: ['Cisco'], name: "Pathway To Your Future Programme",
      type: 'events', category: [''],
      startDate: new Date("February 2022"),
      endDate: new Date("February 2022"),
      description: 'Gained insights into software design and development lifecycle during a one-week program, collaborating with a group of 4 professionals and completing a hands-on, self-led project.',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: []
    },
    {
      id: 4, organization: ['The Heathland School'], name: "Volunteer Consultant (Computer Science)",
      type: 'volunteering', category: [''],
      startDate: new Date("September 2017"),
      endDate: new Date("June 2022"),
      description: 'Served as Subject Captain, advising and mentoring younger students in computer education, programming, assisting with coursework, classwork, and homework. Supported learning in classrooms and extracurricular clubs through one-on-one and group guidance.',
      links: ['https://www.heathland.hounslow.sch.uk/'], skills: [''], modules: [], locations: ['TW4 5JD'], relatedActivities: [0, 2]
    },
    {
      id: 5, organization: [''], name: "BSc Hons. Computer Science (Software Engineering)", type: 'education',
      category: [''], startDate: new Date("September 2022"),
      endDate: new Date("July 2025"),
      description: 'With my dissertation on Concurrency-Based Game Environments, I studied several modules including; Software Engineering, Operating Systems, Databases, Software Design, Algorithms and Complexity, Symbolic AI',
      links: [''], skills: [''], modules: [''], locations: ['TW20 0EX'], relatedActivities: []
    },
    {
      id: 6, organization: [''], name: "Royal Hackaway v6",
      type: 'events', category: [''],
      startDate: new Date("February 2023"),
      endDate: new Date("February 2023"),
      description: 'Used Google MLKit to develop a Wordsearch solver for Android. After taking a picture of a word search in the app or providing one from your gallery, the app scans the word search, solves it and gives you the answer. The project allowed the team to learn how to use Google\'s mobile machine learning kit, OpenCV and OCR, and strengthen our skills in Java and Android Studio.',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: []
    },
    {
      id: 7, organization: [''], name: "Royal Hackaway v7",
      type: 'events', category: [''],
      startDate: new Date("January 2024"),
      endDate: new Date("January 2024"),
      description: 'Built a multi-project hub. We designed a mock landing page for the hackathon event itself, which featured a purposefully unintuitive \'sign-up\' form that acted as a fun puzzle. After solving that, the user was taken to a portal with a choice of three different mini-projects: a self-driving car game, a Jarvis-like assistant program, or a coloring game. The team had fun and learnt a lot, using Flask for the website, Tkinter for the coloring game, Pygame for the car game, and many online APIs for the assistant, all of which were new to us.',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: []
    },
    {
      id: 8, organization: [''], name: "Computer Science Teaching Assistant",
      type: 'jobs', category: [''],
      startDate: new Date("September 2024"),
      endDate: new Date("July 2025"),
      description: 'Guided undergraduates in programming labs (Python, Java, SWI-Prolog), explaining complex programming concepts and advised with debugging and other practical exercises. Led weekly review sessions, assessed coursework, and gave feedback. Enhanced students\' problem - solving skills, fostering critical thinking, while strengthening technical expertise.',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: []
    },
    {
      id: 9, organization: [''], name: "Make a Difference Day @ RHUL",
      type: 'events', category: [''],
      startDate: new Date("October 2024"),
      endDate: new Date("October 2024"),
      description: 'Volunteered with Screen Share UK, repairing laptops for distribution to refugees. This work involved hands-on hardware diagnostics, component replacement (e.g., batteries, hard drives), and OS re-installations.',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: []
    },
    {
      id: 10, organization: [''], name: "Royal Hackaway v8",
      type: 'events', category: [''],
      startDate: new Date("February 2025"),
      endDate: new Date("February 2025"),
      description: 'Won 1st place for Verdn\'s Environmental Hack challenge at Royal Hackaway v8. Developed a tool to track LLM carbon footprints and auto-offset emissions via Verdn’s initiatives (e.g., tree-planting). Produced during a 48-hour hackathon (team of 3), demonstrating rapid full-stack development.',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: []
    },
  ])
});

export type { Skill, SkillCategory, Certificate, Project, Link, LinkType, Role, RoleCategory, Organization, Module };
export { db };