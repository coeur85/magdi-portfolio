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
  Component
} from 'lucide-react';

interface StackIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

const iconMap: Record<string, React.ElementType> = {
  // Database
  'sql server': Database,
  mysql: Database,
  postgresql: Database,
  'query optimization': Unplug,
  'backup & recovery': Server,
  'database design': Database,
  'database migration': Database,
  'query tuning': Unplug,
  etl: Server,
  
  // Software Engineering
  '.net framework': Code,
  'c#': Code,
  'asp.net core': Code,
  '.net core': Code,
  react: Code,
  'next.js': Code,
  javascript: Code,
  typescript: Code,
  'restful apis': Code,
  
  // DevOps & Cloud
  azure: CloudCog,
  'azure devops': CloudCog,
  docker: Container,
  kubernetes: CloudCog,
  'ci/cd pipelines': Terminal,
  terraform: CloudCog,
  git: GitMerge,
  powershell: Shell,
  bash: Shell,
};

// Simple normalization
const normalizeName = (name: string) => name.toLowerCase().replace(/ /g, ' ');

export const StackIcon: React.FC<StackIconProps> = ({ name, ...props }) => {
  const normalizedName = normalizeName(name);
  const IconComponent = iconMap[normalizedName] || Component; // Default icon
  return <IconComponent {...props} />;
};
