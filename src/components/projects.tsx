'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { StackIcon } from '@/components/stack-icon';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as React from 'react';

const projectsData = [
  {
    title: 'MCP (Model Context Protocol)',
    description: 'Engineered a Model Context Protocol (MCP) for Claude 4, enabling it to diagnose complex SQL Server replication issues in a live production environment. The AI-driven solution proved highly effective.',
    image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxBbCUyMGNvZGV8ZW58MHx8fHwxNzUyNTEwMjU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Python', 'SQL Server', 'Docker', '.NET Core'],
    liveUrl: null,
    githubUrl: '#',
    aiHint: 'AI code'
  },
  {
    title: 'Project Alpha',
    description: 'A full-stack web application for project management, built with Blazor and .NET Core. Features real-time collaboration and a custom Kanban board.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjAlMjB8ZW58MHx8fHwxNzUyNTAzODE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Blazor', '.NET Core', 'SQL Server', 'Azure'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'dashboard data'
  },
  {
    title: 'Cloud Orchestrator',
    description: 'An automated infrastructure provisioning tool using Terraform and Azure DevOps to deploy and manage microservices on Kubernetes.',
    image: 'https://images.unsplash.com/photo-1667372283545-1261fb5c427a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8ZGF0YWJhc2V8ZW58MHx8fHwxNzUyNTAzOTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Terraform', 'Azure DevOps', 'Kubernetes', 'Docker', 'PowerShell'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'cloud infrastructure'
  },
  {
    title: 'Legacy DB Modernization',
    description: 'A successful migration and modernization of a large-scale legacy SQL Server database, improving performance and scalability by over 50%.',
    image: 'https://images.unsplash.com/photo-1523120974498-9d764390d8e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8a2V5Ym9hcmQlMjB8ZW58MHx8fHwxNzUyNTA0MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['SQL Server', 'Database Migration', 'Query Tuning', 'ETL'],
    liveUrl: null,
    githubUrl: '#',
    aiHint: 'server room'
  },
];

type Project = typeof projectsData[0];

const ProjectCard3D: React.FC<{ project: Project }> = ({ project }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { width, height, left, top } = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateY,
        rotateX,
      }}
      className="relative"
    >
      <Card key={project.title} className="shadow-lg dark:shadow-accent/20 flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 h-full w-full" style={{transform: 'translateZ(75px)'}}>
        <CardHeader className="p-0">
          <Image
            src={project.image}
            width={600}
            height={400}
            alt={`Screenshot of ${project.title}`}
            className="object-cover w-full h-48"
            data-ai-hint={project.aiHint}
          />
        </CardHeader>
        <div className="flex flex-col flex-1 p-6">
          <CardTitle className="font-headline text-xl mb-2">{project.title}</CardTitle>
          <CardDescription className="flex-1 text-muted-foreground">{project.description}</CardDescription>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="flex items-center gap-1 border-accent text-accent">
                 <StackIcon name={tag} className="h-4 w-4" />
                <span>{tag}</span>
              </Badge>
            ))}
          </div>
        </div>
        <CardFooter className="p-6 pt-0">
        </CardFooter>
      </Card>
    </motion.div>
  );
};


export default function Projects() {
  return (
    <section id="projects" className="relative w-full overflow-hidden py-20 md:py-32 bg-background" style={{perspective: '1000px'}}>
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <StackIcon name="git" className="absolute h-24 w-24 top-10 right-10 text-foreground animate-float" style={{ animationDuration: '1.62s' }} />
        <StackIcon name="terraform" className="absolute h-32 w-32 bottom-1/2 left-10 text-foreground animate-float" style={{ animationDelay: '-0.54s' }} />
        <StackIcon name="blazor" className="absolute h-40 w-40 bottom-20 right-1/4 text-foreground animate-float" style={{ animationDuration: '1.98s' }} />
        <StackIcon name="typescript" className="absolute h-20 w-20 top-1/2 left-3/4 text-foreground animate-float" style={{ animationDelay: '-0.18s' }} />
        <StackIcon name="azure devops" className="absolute h-28 w-28 bottom-10 left-1/2 text-foreground animate-float" style={{ animationDuration: '2.16s', animationDelay: '-0.9s' }} />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Featured Projects</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Here are some of the projects I'm proud to have worked on.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projectsData.map((project) => (
            <ProjectCard3D key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
