// Content for the scroll story. Each chapter is one scene of the 3D core.
// Copy is deliberately conservative: it follows the documented stage of each
// project and leaves out people, organisations and measured figures.

export type SceneId =
  | 'intro'
  | 'about'
  | 'cases'
  | 'performance'
  | 'cloud'
  | 'resilience'
  | 'observability'
  | 'data'
  | 'architecture'
  | 'skills'
  | 'contact';

export type Project = {
  title: string;
  summary: string;
};

export type Chapter = {
  id: SceneId;
  eyebrow: string;
  headline: string;
  sub: string;
  // How AI fits into this kind of work, in one sentence.
  ai?: string;
  // The ways AI is used across all of the work; shown as a summary in one chapter.
  aiUses?: { label: string; text: string }[];
  // Which side of the screen the text sits on; the core takes the other side.
  side: 'left' | 'right';
  projects: Project[];
};

export const profile = {
  name: 'Ahmed Magdi',
  title: 'Database Administrator & Passionate Software & DevOps Engineer',
  tagline: 'Keeping SQL Server fast, recoverable and well monitored, including on Azure.',
  photo: '/images/profile.jpeg',
  email: 'me@amagdi.dev',
  linkedin: 'https://www.linkedin.com/in/ahmedmmagdi/',
  // Generated from docs/cv.html.
  cv: '/Ahmed-Magdi-CV.pdf',
};

// Written from the portfolio guide's career summary. It claims technical leadership,
// not people management, because that is what the record supports.
export const about = {
  headline: 'From troubleshooting to technical ownership.',
  paragraphs: [
    'A SQL Server DBA who started out troubleshooting databases and grew into cloud, data modeling, architecture and reporting to management.',
    'Most fixes depend on other teams. The work is giving them clear evidence, then staying with the problem until the fix is confirmed.',
  ],
  principles: [
    { title: 'Evidence first', text: 'Measure and test before changing anything.' },
    { title: 'Clear requirements', text: 'Know what the business actually needs before designing a fix.' },
    { title: 'Collaboration', text: 'Work side by side with developers, network teams and stakeholders.' },
    { title: 'Follow-through', text: 'A fix isn’t done until someone confirms it works.' },
  ],
};

export type CaseStudy = {
  area: string;
  title: string;
  problem: string;
  action: string;
  result: string;
};

// The four projects with the strongest evidence in the portfolio guide.
export const caseStudies: CaseStudy[] = [
  {
    area: 'Data integrity',
    title: 'Deleting customers without losing history',
    problem: 'Deleting customers could break the order history that referenced them.',
    action: 'Agreed with stakeholders to keep order lines with NULL customer references, then updated the schema and procedures.',
    result: 'An agreed approach, with checks that restoration works.',
  },
  {
    area: 'Performance',
    title: 'A faster customer-lookup API',
    problem: 'A customer-lookup API was slow.',
    action: 'Analysed the workload, rewrote the stored procedure and added an index.',
    result: 'Measurably faster in side-by-side tests.',
  },
  {
    area: 'Cloud',
    title: 'Restoring Managed Instance connectivity',
    problem: 'Connections to Azure SQL Managed Instance were failing.',
    action: 'Traced it to network routing and gave the network team the change it needed.',
    result: 'The network team confirmed connectivity was restored.',
  },
  {
    area: 'Monitoring',
    title: 'Alerting on failed automation',
    problem: 'Failed Azure Automation runs needed to reach the team.',
    action: 'Built and tested an email alert, then tuned out repeat notifications.',
    result: 'A working alert without the noise.',
  },
];

export const chapters: Chapter[] = [
  {
    id: 'performance',
    eyebrow: 'Performance',
    headline: 'Slow queries, made fast.',
    sub: 'Backed by workload analysis and side-by-side tests.',
    ai: 'reading query plans and reviewing T-SQL before testing.',
    side: 'left',
    projects: [
      {
        title: 'API query performance',
        summary: 'Rewrote a slow stored procedure and added an index; measurably faster in tests.',
      },
      {
        title: 'Schema and clustered index review',
        summary: 'Reviewed a column change and its clustered-index design for risk.',
      },
      {
        title: 'Date-based table partitioning',
        summary: 'Designed date-based partitioning for growing tables.',
      },
    ],
  },
  {
    id: 'cloud',
    eyebrow: 'Cloud',
    headline: 'Taking SQL Server to Azure, and keeping it connected.',
    sub: 'Azure SQL Managed Instance: the database, the network and the platform.',
    ai: 'writing PowerShell and automation, and working through connectivity problems.',
    side: 'right',
    projects: [
      {
        title: 'Managed Instance migration',
        summary: 'Planned the move to Azure SQL Managed Instance.',
      },
      {
        title: 'Connectivity resolution',
        summary: 'Traced a connection failure to routing; the network team confirmed the fix.',
      },
      {
        title: 'AKS private endpoint investigation',
        summary: 'Investigated private-endpoint connectivity for AKS workloads.',
      },
      {
        title: 'Maintenance and job visibility',
        summary: 'Reviewed maintenance routines and agent-job visibility.',
      },
    ],
  },
  {
    id: 'resilience',
    eyebrow: 'Resilience',
    headline: 'Making sure data can be recovered.',
    sub: 'Backups, restores, Always On and replication.',
    ai: 'writing and reviewing backup, restore and replication scripts.',
    side: 'left',
    projects: [
      {
        title: 'Backup upload reliability',
        summary: 'Investigated unreliable backup uploads; proposed a proof of concept.',
      },
      {
        title: 'Backup completion notifications',
        summary: 'Explored automatic notifications when backups complete.',
      },
      {
        title: 'Restore automation',
        summary: 'Scripted and automated database restores.',
      },
      {
        title: 'Always On secondary investigation',
        summary: 'Investigated data and redo behaviour on a secondary replica.',
      },
      {
        title: 'Transactional replication',
        summary: 'Designed replication and subscriber retention.',
      },
    ],
  },
  {
    id: 'observability',
    eyebrow: 'Observability',
    headline: 'Finding out what went wrong, and why.',
    sub: 'Alerts, monitoring and incident investigations.',
    ai: 'sifting through logs, alerts and incident data to find causes faster.',
    side: 'right',
    projects: [
      {
        title: 'Automation failure alerting',
        summary: 'Built, tested and tuned an alert for failed automation runs.',
      },
      {
        title: 'Query observability',
        summary: 'Designed application-level query monitoring, requested by leadership.',
      },
      {
        title: 'Missing data incident',
        summary: 'Investigated a reported missing-data incident.',
      },
      {
        title: 'Duplicate data investigation',
        summary: 'Reproduced duplicate localization data, traced its source and raised it with the team.',
      },
    ],
  },
  {
    id: 'data',
    eyebrow: 'Data engineering',
    headline: 'Keeping data correct and well modelled.',
    sub: 'Data models, ETL and integrity changes.',
    ai: 'drafting and reviewing data models, ETL logic and SSIS configuration.',
    side: 'left',
    projects: [
      {
        title: 'Customer deletion and restoration',
        summary: 'Agreed a retention approach and delivered it with restoration checks.',
      },
      {
        title: 'Data warehouse load review',
        summary: 'Reviewed data warehouse load orchestration.',
      },
      {
        title: 'Data model refactoring',
        summary: 'Specified a refactored data model and ETL design.',
      },
      {
        title: 'SSIS runtime credentials',
        summary: 'Configured runtime credentials for SSIS deployments.',
      },
    ],
  },
  {
    id: 'architecture',
    eyebrow: 'Architecture & AI',
    headline: 'Beyond the database engine.',
    sub: 'Integration, access and reporting decisions, with AI in every part of the work.',
    aiUses: [
      { label: 'Diagnosis', text: 'Claude + MCP on live SQL Server issues.' },
      { label: 'Code and scripts', text: 'T-SQL, PowerShell, SSIS and automation.' },
      { label: 'Analysis', text: 'Query plans, workloads, logs and incidents.' },
      { label: 'Docs and reports', text: 'Design comparisons, docs and stakeholder reports.' },
    ],
    side: 'right',
    projects: [
      {
        title: 'Claude + MCP for SQL Server',
        summary: 'Built an MCP server so Claude can diagnose SQL Server replication issues in production.',
      },
      {
        title: 'Third-party integration',
        summary: 'Compared options for integrating a third-party system.',
      },
      {
        title: 'Sensitive data access',
        summary: 'Explored designs for controlling access to sensitive data.',
      },
      {
        title: 'Performance reporting',
        summary: 'Prepared performance reports for stakeholders across organizations.',
      },
    ],
  },
];

export const skills: { category: string; items: string[] }[] = [
  {
    category: 'Database',
    items: [
      'SQL Server',
      'Azure SQL Managed Instance',
      'Always On availability groups',
      'Transactional replication',
      'Query tuning & indexing',
      'Table partitioning',
      'Backup & restore',
      'Database design',
      'MySQL',
      'PostgreSQL',
    ],
  },
  {
    category: 'Data & integration',
    items: ['SSIS', 'Data warehousing & ETL', 'Data modeling', 'Integration architecture', 'Data access design'],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      'Azure',
      'Azure Automation',
      'Azure Kubernetes Service',
      'Docker',
      'Kubernetes',
      'Terraform',
      'CI/CD pipelines',
      'Git',
      'PowerShell',
      'Bash',
    ],
  },
  {
    category: 'Software engineering',
    items: ['.NET', 'C#', 'ASP.NET Core', 'Blazor', 'JavaScript', 'TypeScript', 'RESTful APIs'],
  },
];
