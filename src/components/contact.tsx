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

const contactDetails = [
  { name: 'Alexandria, Egypt', icon: <MapPin className="h-8 w-8" />, href: null },
  { name: 'Email', icon: <Mail className="h-8 w-8" />, href: 'mailto:me@amagdi.dev', target: '_self' },
  { name: 'LinkedIn', icon: <Linkedin className="h-8 w-8" />, href: 'https://www.linkedin.com/in/ahmedmmagdi/', target: '_blank' },
  { name: 'GitHub', icon: <Github className="h-8 w-8" />, href: 'https://github.com/coeur85', target: '_blank' },
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
        <StackIcon name="powershell" className="absolute h-24 w-24 top-10 left-10 text-foreground" />
        <StackIcon name="bash" className="absolute h-32 w-32 bottom-20 right-10 text-foreground" />
        <StackIcon name="ci/cd pipelines" className="absolute h-28 w-28 top-1/2 right-1/2 text-foreground" />
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
                        <Link href={detail.href} target={detail.target} prefetch={false} className="bg-accent/20 text-accent rounded-full p-3 transform transition-transform hover:scale-110">
                            {detail.icon}
                            <span className="sr-only">{detail.name}</span>
                        </Link>
                      ) : (
                        <div className="bg-accent/20 text-accent rounded-full p-3 transform transition-transform hover:scale-110 cursor-default">
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
