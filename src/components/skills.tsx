import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Code, CloudCog } from 'lucide-react';
import { StackIcon } from './stack-icon';

const skillsData = {
  'Database Administration': {
    icon: <Database className="h-8 w-8 text-accent" />,
    skills: ['SQL Server', 'MySQL', 'PostgreSQL', 'Query Optimization', 'Backup & Recovery', 'Database Design'],
  },
  'Software Engineering': {
    icon: <Code className="h-8 w-8 text-accent" />,
    skills: ['.NET Framework', 'C#', 'ASP.NET Core', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'RESTful APIs'],
  },
  'DevOps & Cloud': {
    icon: <CloudCog className="h-8 w-8 text-accent" />,
    skills: ['Azure', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Terraform', 'Git', 'PowerShell', 'Bash'],
  },
};

export default function Skills() {
  return (
    <section id="skills" className="relative w-full overflow-hidden py-20 md:py-32 bg-secondary/20">
       <div className="absolute inset-0 z-0 opacity-[0.03]">
        <StackIcon name="sql server" className="absolute h-24 w-24 top-20 left-10 text-foreground" />
        <StackIcon name="docker" className="absolute h-32 w-32 bottom-20 right-10 text-foreground" />
        <StackIcon name="kubernetes" className="absolute h-40 w-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-foreground" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">My Professional Skills</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A glimpse into the technologies and tools I work with.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {Object.entries(skillsData).map(([category, { icon, skills }]) => (
            <Card key={category} className="bg-card/50 backdrop-blur-sm border-primary/20 transform hover:scale-105 transition-transform duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                {icon}
                <CardTitle className="font-headline text-2xl">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-2 text-sm py-1 px-3 bg-primary/50 text-foreground">
                      <StackIcon name={skill} className="h-4 w-4" />
                      <span>{skill}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
