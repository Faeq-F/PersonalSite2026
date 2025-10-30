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
  code: string;
  description: string;
  awarded: Date;
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
db.version(1).stores({
  skills: 'name, *category, *experienceLevel',
  skillCategories: 'name, *subCategories',
  certificates: 'name, *organization, *skills, code',
  projects: 'name, *skills, startDate, endDate, *relatedActivities, *relatedProjects',
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
    { name: "Node.js", category: ['Runtime Environments',], experienceLevel: [] },
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
    { name: "HTML5", category: ["Languages", 'Front-End Languages',], experienceLevel: [] },
    { name: "CSS3", category: ["Languages", 'Style Sheet Languages', 'Front-End Languages',], experienceLevel: [] },
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
  ])

  db.links.bulkPut([
    { url: "https://www.heathland.hounslow.sch.uk/", type: 'Organization' },
  ])

  db.organizations.bulkPut([
    { name: "", roles: [7], locations: [''], links: [''] },
  ])

  db.certificates.bulkPut([
    {
      name: "BSc Hons. Computer Science (Software Engineering)", description: 'My Degree in Software Engineering from Royal Holloway, University of London', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date('August 2025')
    },
    { name: "CS & Physics A-level cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "Maths A level cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "Spanish GCSE cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "Bio, physics, chem cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "Geog, RS, Maths cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "CS & 2 engs cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "C# cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "pathway cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "web dev cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "RI masterclass cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "Siemens work experience cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "Science engineering & IT work experience cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "become a hacker cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "make a website cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "tech the future cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "tech the future insight cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
    { name: "career in tech cert", description: '', organization: [''], code: '', links: [''], images: [''], skills: [''], awarded: new Date() },
  ])

  db.projects.bulkPut([
    {
      name: "My Phone",
      description: 'Customizing my Phone',
      links: [''],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [],
      relatedProjects: ['My Desktop']
    },
    {
      name: "My Desktop",
      description: 'Customizing my Desktop',
      links: [''],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [],
      relatedProjects: ['My Phone']
    },
    {
      name: "Zarlasht",
      description: 'My dissertation. Includes 6 programs total; Online Chat (JS & Erl targets), Tic-Tac-Toe (JS & Erl targets), Pong (Erl target) & Zarlasht (Erl target)',
      links: ['https://github.com/Faeq-F/Zarlasht'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Muslim Guide", description: 'Duas and Umrah, Hajj & Madinah Guides',
      links: ['https://github.com/Faeq-F/MuslimGuide'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "IT Assets Metadata Repository",
      description: 'A holistic Web-based system that supports the metadata-based organization of different source-code related assets',
      links: ['https://github.com/Faeq-F/IT-Assets-Metadata-Repository'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "ALSET",
      description: 'Track following robot using the EV3 kit, LeJOS (Java for Lego Mindstorms) and an Android phone',
      links: ['https://github.com/Faeq-F/ALSET'],
      skills: [''],
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
      startDate: new Date("January 2020"), endDate: new Date("December 2019"),
      relatedActivities: [],
      relatedProjects: []
    },
    {
      name: "WhatsappPortable", description: 'A portable application to use WhatsApp',
      links: ['https://github.com/Faeq-F/whatsappPortable'],
      skills: [
        'Flutter', 'Dart', 'CSS3', 'JavaScript', 'HTML5',
      ],
      startDate: new Date('June 2024'), endDate: new Date('"December 2023"'),
      relatedActivities: [],
      relatedProjects: []
    },
    {
      name: "My Personal Site",
      description: 'This Site!',
      links: [
        'https://github.com/Faeq-F/faeq-f.github.io',
        'https://faeq-f.github.io'
      ],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Dynamic Memory Allocator Simulator",
      description: 'A program that simulates a dynamic memory allocator',
      links: ['https://github.com/Faeq-F/DynamicMemoryAllocatorSimulator'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Notes",
      description: 'Notes written for a variety of topics; lectures at university, advanced topic talks given by guests, etc.',
      links: ['https://github.com/Faeq-F/Notes'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "LLM 2 Leaf",
      description: 'Convert your LLM usage to planting trees',
      links: ['https://github.com/Faeq-F/LLM-2-Leaf'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    { name: "Generic social media app", description: '', links: [''], skills: [''], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    {
      name: "Tool Customizations",
      description: 'Setting files and other resources for my terminal, text editor, etc.',
      links: ['https://github.com/Faeq-F/ToolCustomizations'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Partial Scroll",
      description: 'A demo webpage where, in a section of the page, only one half of the page scrolls, with static content on the other half',
      links: ['https://github.com/Faeq-F/PartialScroll'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Sandbox",
      description: 'Snippets of useful code found / developed or still being developed. These snippets should be reusable for any program.',
      links: ['https://github.com/Faeq-F/SandBox'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "JavaFX Calculator",
      description: 'A calculator that can evaluate expressions in both infix and postfix notation',
      links: ['https://github.com/Faeq-F/JavaFX-Calculator'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "JavaFX Minimal Navigation example",
      description: 'An example of navigating between scenes in JavaFX',
      links: ['https://github.com/Faeq-F/JavaFX-MinimalNavExample'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Business Card",
      description: 'My Business Card (An Android app)',
      links: ['https://github.com/Faeq-F/BusinessCard'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Browser Home page",
      description: 'Simple home page for your browser',
      links: ['https://github.com/Faeq-F/Browser-Home-Page'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Hackaway v7 Sign-up Page",
      description: 'Get to our Royal Hackaway V7 project',
      links: ['https://github.com/Faeq-F/HackawayV7'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "OhMyPosh Windows Terminal Theme",
      description: 'My Windows terminal theme - using OhMyPosh',
      links: ['https://github.com/Faeq-F/WindowsTerminalTheme'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Gideon",
      description: 'An automated personal assistant',
      links: ['https://github.com/Faeq-F/Gideon'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Ascii Art viewer",
      description: 'An ASCII art viewer that can also compress the files using Run Length Encoding',
      links: ['https://github.com/Faeq-F/ASCII-art-viewer'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "WRDSRCH",
      description: 'A Wordsearch solver',
      links: ['https://github.com/Faeq-F/WRDSRCH'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    {
      name: "Portable Application Launcher",
      description: 'A launcher for portable apps on your usb drive or computer',
      links: ['https://github.com/Faeq-F/Portable-Application-Launcher'],
      skills: [''],
      startDate: new Date(), endDate: new Date(),
      relatedActivities: [4],
      relatedProjects: ['']
    },
    { name: "soulmate finder", description: '', links: [''], skills: [''], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    { name: "databse x2 ??", description: '', links: [''], skills: [''], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    { name: "pathfinding", description: '', links: [''], skills: [''], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    { name: "trading card??", description: '', links: [''], skills: [''], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    { name: "album cover", description: '', links: [''], skills: [''], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
    { name: "book system??", description: '', links: [''], skills: [''], startDate: new Date(), endDate: new Date(), relatedActivities: [4], relatedProjects: [''] },
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
      id: 4, organization: ['The Heathland School'], name: "Volunteer Consultant (Computer Science)",
      type: 'volunteering', category: [''],
      startDate: new Date("September 2017"),
      endDate: new Date("June 2022"),
      description: 'Served as Subject Captain, advising and mentoring younger students in computer education, programming, assisting with coursework, classwork, and homework. Supported learning in classrooms and extracurricular clubs through one-on-one and group guidance.',
      links: ['https://www.heathland.hounslow.sch.uk/'], skills: [''], modules: [], locations: ['TW4 5JD'], relatedActivities: [0, 2]
    },
    {
      id: 0, organization: ['The Heathland School'], name: "GCSEs",
      type: 'education', category: [''],
      startDate: new Date("September 2018"),
      endDate: new Date("June 2020"),
      description: 'Studied 10 GCSEs including; Computer Science (9), Mathematics (7), Physics (7), English (7), Biology (8)',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: [4]
    },
    {
      id: 1, organization: [], name: "Quokka",
      type: 'projects', category: [''],
      startDate: new Date("January 2020"),
      endDate: new Date(),
      description: 'A lightweight, customizable keystroke launcher in C#, C++, WPF and .NET. Enables diverse, flexible workflows via a plugin-driven design, enabling users to extend functionality according to unique needs. Accompanied by default plugins.',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: [4]
    },
    {
      id: 2, organization: ['The Heathland School'], name: "A-levels",
      type: 'education', category: [''],
      startDate: new Date("September 2020"),
      endDate: new Date("June 2022"),
      description: 'Studied 3 A-Levels; Computer Science (A), Mathematics (B), Physics (C)',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: [4]
    },
    {
      id: 3, organization: ['Cisco'], name: "Pathway To Your Future Programme",
      type: 'events', category: [''],
      startDate: new Date("February 2022"),
      endDate: new Date("February 2022"),
      description: 'Gained insights into software design and development lifecycle during a one-week program, collaborating with a group of 4 professionals and completing a hands-on, self-led project.',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: [4]
    },
    {
      id: 5, organization: [''], name: "BSc Hons. Computer Science (Software Engineering)", type: 'education',
      category: [''], startDate: new Date("September 2022"),
      endDate: new Date("July 2025"),
      description: 'With my dissertation on Concurrency-Based Game Environments, I studied several modules including; Software Engineering, Operating Systems, Databases, Software Design, Algorithms and Complexity, Symbolic AI',
      links: [''], skills: [''], modules: [''], locations: ['TW20 0EX'], relatedActivities: [4]
    },
    {
      id: 6, organization: [''], name: "Royal Hackaway v6",
      type: 'events', category: [''],
      startDate: new Date("February 2023"),
      endDate: new Date("February 2023"),
      description: '',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: [4]
    },
    {
      id: 7, organization: [''], name: "Royal Hackaway v7",
      type: 'events', category: [''],
      startDate: new Date("January 2024"),
      endDate: new Date("January 2024"),
      description: '',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: [4]
    },
    {
      id: 8, organization: [''], name: "Computer Science Teaching Assistant",
      type: 'jobs', category: [''],
      startDate: new Date("September 2024"),
      endDate: new Date("July 2025"),
      description: 'Guided undergraduates in programming labs (Python, Java, SWI-Prolog), explaining complex programming concepts and advised with debugging and other practical exercises. Led weekly review sessions, assessed coursework, and gave feedback. Enhanced students\' problem - solving skills, fostering critical thinking, while strengthening technical expertise.',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: [4]
    },
    {
      id: 9, organization: [''], name: "Royal Hackaway v8",
      type: 'events', category: [''],
      startDate: new Date("February 2025"),
      endDate: new Date("February 2025"),
      description: 'Won 1st place for Verdn\'s Environmental Hack challenge at Royal Hackaway v8. Developed a tool to track LLM carbon footprints and auto- offset emissions via Verdn’s initiatives(e.g., tree-planting). Produced during a 48-hour hackathon (team of 3), demonstrating rapid full-stack development.',
      links: [''], skills: [''], modules: [''], locations: [''], relatedActivities: [4]
    },
    // todo add rest
  ])
});

export type { Skill, SkillCategory, Certificate, Project, Link, LinkType, Role, RoleCategory, Organization, Module };
export { db };