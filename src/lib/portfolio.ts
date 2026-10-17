// Content for the scroll story. Each chapter is one scene of the 3D core.
// Copy is deliberately conservative: it follows the documented stage of each
// project and leaves out people, organisations and measured figures.

export type SceneId =
  | 'intro'
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
  tagline: 'I keep data fast, safe and online, from the query plan to the cloud network.',
};

export const chapters: Chapter[] = [
  {
    id: 'performance',
    eyebrow: 'Performance',
    headline: 'Faster. Measured, not guessed.',
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
    headline: 'Into the cloud. Connected end to end.',
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
    headline: 'Built to recover.',
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
    headline: 'Nothing fails quietly.',
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
    headline: 'Every row accounted for.',
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
    headline: 'Beyond the engine.',
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
