import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Code, CloudCog } from 'lucide-react';

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
    <section id="skills" className="w-full py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
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
                    <Badge key={skill} variant="secondary" className="text-sm py-1 px-3 bg-primary/50 text-foreground">
                      {skill}
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
