'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { StackIcon } from './stack-icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const UpworkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.12,9.33a5.3,5.3,0,0,0-4.33-4.32,1,1,0,0,0-1.1,1.32,1,1,0,0,0,1.32,1.1,3.31,3.31,0,0,1,2.6,3.34,3.28,3.28,0,0,1-3.28,3.28H12.3v3.66a1,1,0,1,0,2,0V16.39h.44A5.3,5.3,0,0,0,18.12,9.33Zm-7.39,5.44H9.3v3.66a1,1,0,1,0,2,0V13.43a1,1,0,0,0-1-1H9.3a1,1,0,0,0-1,1v.34a1,1,0,1,0,2,0V13.77h.23A3.68,3.68,0,0,0,10.73,8a3.69,3.69,0,0,0-7.38,0,1,1,0,1,0,2,0,1.69,1.69,0,1,1,3.38,0,1,1,0,0,0-1,1v4.77Z"/>
  </svg>
);

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const contactDetails = [
  { name: 'Alexandria, Egypt', icon: <MapPin className="h-8 w-8" />, href: null },
  { name: 'Email', icon: <Mail className="h-8 w-8" />, href: 'mailto:me@amagdi.dev', target: '_self' },
  { name: 'LinkedIn', icon: <Linkedin className="h-8 w-8" />, href: 'https://www.linkedin.com/in/ahmedmmagdi/', target: '_blank' },
  { name: 'GitHub', icon: <Github className="h-8 w-8" />, href: 'https://github.com/coeur85', target: '_blank' },
  { name: 'X', icon: <XIcon className="h-8 w-8" />, href: 'https://x.com/Coeur85', target: '_blank' },
  { name: 'Upwork', icon: <UpworkIcon className="h-8 w-8" />, href: 'https://upwork.com/freelancers/magdi', target: '_blank' },
];

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden py-20 md:py-32 bg-secondary/20">
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <StackIcon name="powershell" className="absolute h-24 w-24 top-10 left-10 text-foreground animate-float" style={{ animationDuration: '4.5s' }} />
        <StackIcon name="bash" className="absolute h-32 w-32 bottom-20 right-10 text-foreground animate-float" style={{ animationDuration: '5.5s', animationDelay: '-1s' }} />
        <StackIcon name="ci/cd pipelines" className="absolute h-28 w-28 top-1/2 right-1/2 text-foreground animate-float" style={{ animationDelay: '-2s' }} />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Get In Touch</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Have a question or want to work together? Feel free to reach out.
          </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold font-headline">Contact Information</h3>
            <p className="text-muted-foreground">
              You can find me in Alexandria, Egypt, or reach me through the following channels:
            </p>
            <div className="flex items-center gap-4">
              <TooltipProvider>
                {contactDetails.map((detail) => (
                  <Tooltip key={detail.name}>
                    <TooltipTrigger asChild>
                      {detail.href ? (
                        <Link href={detail.href} target={detail.target} prefetch={false} className="bg-accent/20 text-accent rounded-full p-3 transition-all duration-200 ease-in-out hover:scale-110 active:scale-95">
                            {detail.icon}
                            <span className="sr-only">{detail.name}</span>
                        </Link>
                      ) : (
                        <div className="bg-accent/20 text-accent rounded-full p-3 transition-all duration-200 ease-in-out hover:scale-110 cursor-default">
                           {detail.icon}
                           <span className="sr-only">{detail.name}</span>
                        </div>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{detail.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-headline">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl><Textarea placeholder="I'd like to discuss..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
