import React from 'react';
import {
  Database,
  Code,
  CloudCog,
  Shell,
  Terminal,
  Server,
  Container,
  GitMerge,
  Unplug,
  Component,
  Replace,
  Workflow,
} from 'lucide-react';

interface StackIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

// Custom SVG Icons as React Components
const DotNetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.08V7.92c0-.52.42-.92.92-.92h.17c.5 0 .91.4.91.92v8.16c0 .52-.41.92-.91.92h-.17c-.5 0-.92-.4-.92-.92zm5.18-6.07h-2.1c-.51 0-.92.41-.92.92v4.24c0 .51.41.92.92.92h2.1c.51 0 .92-.41.92-.92v-4.24c0-.51-.41-.92-.92-.92zM7.92 12c0-.51.41-.92.92-.92h2.1c.51 0 .92.41.92.92s-.41.92-.92.92h-2.1c-.51 0-.92-.41-.92-.92z"/>
  </svg>
);

const CSharpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 8l-1.5 8M14 8l-1.5 8M16.5 10h-9M17.5 14h-9" />
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
  </svg>
);

const SqlServerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 4h-2.5a.5.5 0 00-.5.5V6H8V4.5a.5.5 0 00-.5-.5H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM6 10h12M6 14h12M10 18h4" />
  </svg>
);

const DockerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12.86V21a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8.14a1 1 0 0 1 .5-.87l8-4.5a1 1 0 0 1 1 0l8 4.5a1 1 0 0 1 .5.87zM20.5 11H22m-22 0h1.5M15.5 11H17m-3.5 0H15m-3.5 0H13m-3.5 0H11m-3.5 0H9m-3.5 0H7m-3.5 0H5m-3.5 0H3m8.5-3.5H13m-1.5 0H10m-1.5 0H7m6.5 3.5H15m-1.5 0H12m-1.5 0H9m6.5 3.5H17m-1.5 0H14m-1.5 0H11m-1.5 0H8"/>
    <path d="M11 2.5L2.5 7.5v4l9 5 9-5v-4L13 2.5h-2z" strokeWidth="2" />
  </svg>
);

const NextjsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 15V9l6 6V9" />
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
  </svg>
);

const ReactIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="2"/>
    <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(120 12 12)"/>
    <ellipse cx="12" cy="12" rx="11" ry="4"/>
  </svg>
);

const JavascriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 9a1 1 0 0 1-1-1V5h3v3a1 1 0 0 1-1 1h-1zm5 5a1 1 0 0 1-1-1v-3h3v3a1 1 0 0 1-1 1h-1zM6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
    </svg>
);

const TypescriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18h1.5a2.5 2.5 0 0 0 0-5H4v5zM4 13h1.5a2.5 2.5 0 0 0 2.5-2.5V10"/>
        <path d="M13.5 18H12v-8h4.5a2.5 2.5 0 0 1 0 5h-3"/>
        <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
    </svg>
);


const iconMap: Record<string, React.ElementType> = {
  // Database
  'sql server': SqlServerIcon,
  'mysql': Database,
  'postgresql': Database,
  'query optimization': Unplug,
  'backup & recovery': Server,
  'database design': Database,
  'database migration': Replace,
  'query tuning': Unplug,
  'etl': Workflow,
  
  // Software Engineering
  '.net framework': DotNetIcon,
  'c#': CSharpIcon,
  'asp.net core': DotNetIcon,
  '.net core': DotNetIcon,
  'react': ReactIcon,
  'next.js': NextjsIcon,
  'javascript': JavascriptIcon,
  'typescript': TypescriptIcon,
  'restful apis': Code,
  
  // DevOps & Cloud
  'azure': CloudCog,
  'azure devops': CloudCog,
  'docker': DockerIcon,
  'kubernetes': CloudCog,
  'ci/cd pipelines': Terminal,
  'terraform': CloudCog,
  'git': GitMerge,
  'powershell': Shell,
  'bash': Shell,
};

// Simple normalization
const normalizeName = (name: string) => name.toLowerCase().replace(/ /g, ' ').trim();

export const StackIcon: React.FC<StackIconProps> = ({ name, ...props }) => {
  const normalizedName = normalizeName(name);
  const IconComponent = iconMap[normalizedName] || Component; // Default icon
  return <IconComponent {...props} />;
};
