import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { StackIcon } from '@/components/stack-icon';

const projectsData = [
  {
    title: 'Project Alpha',
    description: 'A full-stack web application for project management, built with Next.js and .NET Core. Features real-time collaboration and a custom Kanban board.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'React', '.NET Core', 'SQL Server', 'Azure'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'dashboard data'
  },
  {
    title: 'Cloud Orchestrator',
    description: 'An automated infrastructure provisioning tool using Terraform and Azure DevOps to deploy and manage microservices on Kubernetes.',
    image: 'https://placehold.co/600x400.png',
    tags: ['Terraform', 'Azure DevOps', 'Kubernetes', 'Docker', 'PowerShell'],
    liveUrl: '#',
    githubUrl: '#',
    aiHint: 'cloud infrastructure'
  },
  {
    title: 'Legacy DB Modernization',
    description: 'A successful migration and modernization of a large-scale legacy SQL Server database, improving performance and scalability by over 50%.',
    image: 'https://placehold.co/600x400.png',
    tags: ['SQL Server', 'Database Migration', 'Query Tuning', 'ETL'],
    liveUrl: null,
    githubUrl: '#',
    aiHint: 'server room'
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full overflow-hidden py-20 md:py-32 bg-background">
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <StackIcon name="git" className="absolute h-24 w-24 top-10 right-10 text-foreground" />
        <StackIcon name="terraform" className="absolute h-32 w-32 bottom-1/2 left-10 text-foreground" />
        <StackIcon name="next.js" className="absolute h-40 w-40 bottom-20 right-1/4 text-foreground" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Featured Projects</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Here are some of the projects I'm proud to have worked on.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <Card key={project.title} className="flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 transform hover:-translate-y-2 transition-transform duration-300">
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
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" asChild>
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button asChild>
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
