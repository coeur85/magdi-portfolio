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
  title: 'Database Admin & Passionate Software & DevOps Engineer',
  tagline:
    'I look after SQL Server databases: performance, Azure, backups and high availability, monitoring and data engineering.',
  photo: '/images/profile.jpeg',
  email: 'me@amagdi.dev',
  linkedin: 'https://www.linkedin.com/in/ahmedmmagdi/',
};

// Written from the portfolio guide's career summary. It claims technical leadership,
// not people management, because that is what the record supports.
export const about = {
  headline: 'From troubleshooting to technical ownership.',
  paragraphs: [
    'I’m a SQL Server database administrator. My work started with troubleshooting databases and has grown into cloud operations, data-model decisions, integration architecture and reporting to management.',
    'I lead through technical ownership. Much of what I fix depends on other teams, so I bring them the evidence and clear requirements they need to act, and I stay with the problem until the fix is confirmed.',
  ],
  principles: [
    { title: 'Evidence first', text: 'I measure and test before I change anything.' },
    { title: 'Clear requirements', text: 'I pin down what the business needs before I design a fix.' },
    { title: 'Collaboration', text: 'I work with developers, network teams and stakeholders to get changes made.' },
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
    problem: 'Customers had to be deleted, and restored if needed, without breaking the order history that referenced them.',
    action: 'Met with the stakeholders and agreed to keep order lines and set their customer references to NULL, then changed the schema and stored procedures to match.',
    result: 'A documented, agreed approach, with specific checks that restoration works.',
  },
  {
    area: 'Performance',
    title: 'A faster customer-lookup API',
    problem: 'A customer-lookup API was slow.',
    action: 'Analysed the workload behind it, rewrote the stored procedure, added a supporting index, and compared the old and new versions side by side.',
    result: 'The new version was measurably faster in testing.',
  },
  {
    area: 'Cloud',
    title: 'Restoring Managed Instance connectivity',
    problem: 'Connections to an Azure SQL Managed Instance were failing.',
    action: 'Traced the failure to network routing and gave the network team the connection details and the route change it depended on.',
    result: 'The network team made the change and confirmed that connectivity was restored.',
  },
  {
    area: 'Monitoring',
    title: 'Alerting on failed automation',
    problem: 'Failures in Azure Automation runs needed to reach the team.',
    action: 'Built and tested an alert, confirmed the email arrived, then adjusted the configuration when it sent repeated notifications.',
    result: 'A working alert that reports failures without the repeat noise.',
  },
];

export const chapters: Chapter[] = [
  {
    id: 'performance',
    eyebrow: 'Performance',
    headline: 'I make slow queries fast.',
    sub: 'Query and schema work grounded in workload analysis and side-by-side tests.',
    ai: 'I use AI to read query plans and workload data faster, and to review rewritten T-SQL before I test it.',
    side: 'left',
    projects: [
      {
        title: 'API query performance',
        summary:
          'Analysed the workload behind a slow customer-lookup API, then tested a rewritten stored procedure with a supporting index. The new version was measurably faster in side-by-side tests.',
      },
      {
        title: 'Schema and clustered index review',
        summary: 'Reviewed a proposed column change and its clustered-index design for risk before it went ahead.',
      },
      {
        title: 'Date-based table partitioning',
        summary: 'Designed date-based partitioning so growing tables stay manageable.',
      },
    ],
  },
  {
    id: 'cloud',
    eyebrow: 'Cloud',
    headline: 'I plan, connect and maintain SQL Server on Azure.',
    sub: 'Azure SQL Managed Instance work that spans the database, the network and the platform around it.',
    ai: 'I use AI to write and review the PowerShell and automation behind cloud changes, and to work through connectivity problems step by step.',
    side: 'right',
    projects: [
      {
        title: 'Managed Instance migration',
        summary: 'Planned the move of SQL Server workloads to Azure SQL Managed Instance.',
      },
      {
        title: 'Connectivity resolution',
        summary:
          'Traced a Managed Instance connection failure to a routing issue, worked with the network team on the change, and got confirmation that connectivity was restored.',
      },
      {
        title: 'AKS private endpoint investigation',
        summary: 'Investigated private-endpoint connectivity for workloads running on Azure Kubernetes Service.',
      },
      {
        title: 'Maintenance and job visibility',
        summary: 'Reviewed maintenance routines and agent-job visibility on Managed Instance.',
      },
    ],
  },
  {
    id: 'resilience',
    eyebrow: 'Resilience',
    headline: 'I make sure data can be recovered.',
    sub: 'Backups, restores, Always On and replication, so the data survives the bad day.',
    ai: 'I use AI to write and review backup, restore and replication scripts.',
    side: 'left',
    projects: [
      {
        title: 'Backup upload reliability',
        summary: 'Investigated unreliable backup uploads and proposed a proof of concept to fix them.',
      },
      {
        title: 'Backup completion notifications',
        summary: 'Explored designs for notifying the team automatically when backups complete.',
      },
      {
        title: 'Restore automation',
        summary: 'Scripted and automated database restores on Managed Instance.',
      },
      {
        title: 'Always On secondary investigation',
        summary: 'Investigated data and redo behaviour on an Always On secondary replica.',
      },
      {
        title: 'Transactional replication',
        summary: 'Designed transactional replication and subscriber retention for data distribution.',
      },
    ],
  },
  {
    id: 'observability',
    eyebrow: 'Observability',
    headline: 'I find out what went wrong, and why.',
    sub: 'Alerts, monitoring and incident work that turn symptoms into answers.',
    ai: 'I use AI to sift through logs, alerts and incident data to get from symptom to cause faster.',
    side: 'right',
    projects: [
      {
        title: 'Automation failure alerting',
        summary:
          'Built and tested an alert for failed Azure Automation runs, confirmed the email arrived, then tuned it to stop repeat notifications.',
      },
      {
        title: 'Query observability',
        summary: 'Designed detailed query monitoring from the application’s point of view, at leadership’s request.',
      },
      {
        title: 'Missing data incident',
        summary: 'Investigated a reported missing-data incident to establish what happened.',
      },
      {
        title: 'Duplicate data investigation',
        summary:
          'Validated duplicate localization data, reproduced it with repeated tests, searched the code for its source, and brought a focused question to the team standup.',
      },
    ],
  },
  {
    id: 'data',
    eyebrow: 'Data engineering',
    headline: 'I keep data correct and well modelled.',
    sub: 'Data models, ETL and integrity changes, agreed with the people who depend on them.',
    ai: 'I use AI to draft and review data models, ETL logic and SSIS configuration.',
    side: 'left',
    projects: [
      {
        title: 'Customer deletion and restoration',
        summary:
          'Agreed a retention approach with stakeholders (keep order lines, null the references), then delivered the schema and procedure changes with restoration checks.',
      },
      {
        title: 'Data warehouse load review',
        summary: 'Reviewed how the data warehouse loads are orchestrated.',
      },
      {
        title: 'Data model refactoring',
        summary: 'Specified a refactored data model and ETL design for device installation data.',
      },
      {
        title: 'SSIS runtime credentials',
        summary: 'Configured runtime credentials for SSIS package deployments.',
      },
    ],
  },
  {
    id: 'architecture',
    eyebrow: 'Architecture & AI',
    headline: 'I work beyond the database engine.',
    sub: 'Integration, access and reporting decisions that connect database work to how the business runs, with AI in every part of the work.',
    aiUses: [
      { label: 'Diagnosis', text: 'Claude connected to SQL Server through MCP to diagnose live issues.' },
      { label: 'Code and scripts', text: 'T-SQL, PowerShell, SSIS and automation, written and reviewed with AI.' },
      { label: 'Analysis', text: 'Query plans, workloads, logs and incidents, read faster with AI.' },
      { label: 'Docs and reports', text: 'Design comparisons, documentation and stakeholder reports, drafted with AI.' },
    ],
    side: 'right',
    projects: [
      {
        title: 'Claude + MCP for SQL Server',
        summary:
          'Built a Model Context Protocol (MCP) server that lets Claude diagnose SQL Server replication issues in a live production environment.',
      },
      {
        title: 'Third-party integration',
        summary: 'Compared architecture options for integrating a third-party system.',
      },
      {
        title: 'Sensitive data access',
        summary: 'Explored designs for controlling access to sensitive data.',
      },
      {
        title: 'Performance reporting',
        summary:
          'Prepared performance reporting for stakeholders across organizations, getting permission before sharing work details.',
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
