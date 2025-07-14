'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getResumeSuggestions, getRewrittenSection } from '@/app/actions';
import { BrainCircuit, Loader2, Wand2 } from 'lucide-react';

const suggestionsSchema = z.object({
  resumeText: z.string().min(50, 'Resume text must be at least 50 characters.'),
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters.'),
});

const rewriteSchema = z.object({
  resumeSection: z.string().min(20, 'Resume section must be at least 20 characters.'),
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters.'),
  userFeedback: z.string().optional(),
});

type SuggestionsFormValues = z.infer<typeof suggestionsSchema>;
type RewriteFormValues = z.infer<typeof rewriteSchema>;

export default function ResumeOptimizer() {
  const [activeTab, setActiveTab] = useState('suggestions');
  const { toast } = useToast();

  const [suggestionsResult, setSuggestionsResult] = useState<string | null>(null);
  const [rewrittenSectionResult, setRewrittenSectionResult] = useState<string | null>(null);

  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [isRewriteLoading, setIsRewriteLoading] = useState(false);

  const suggestionsForm = useForm<SuggestionsFormValues>({
    resolver: zodResolver(suggestionsSchema),
    defaultValues: { resumeText: '', jobDescription: '' },
  });

  const rewriteForm = useForm<RewriteFormValues>({
    resolver: zodResolver(rewriteSchema),
    defaultValues: { resumeSection: '', jobDescription: '', userFeedback: '' },
  });

  const onSuggestionsSubmit: SubmitHandler<SuggestionsFormValues> = async (data) => {
    setIsSuggestionsLoading(true);
    setSuggestionsResult(null);
    const result = await getResumeSuggestions(data);
    if (result.success) {
      setSuggestionsResult(result.suggestions);
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsSuggestionsLoading(false);
  };

  const onRewriteSubmit: SubmitHandler<RewriteFormValues> = async (data) => {
    setIsRewriteLoading(true);
    setRewrittenSectionResult(null);
    const result = await getRewrittenSection(data);
    if (result.success) {
      setRewrittenSectionResult(result.rewrittenSection);
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsRewriteLoading(false);
  };

  return (
    <section id="resume-optimizer" className="w-full py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-accent/20 p-3 text-accent">
                <BrainCircuit className="h-8 w-8" />
            </div>
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">AI-Powered Resume Optimizer</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Use the power of AI to tailor your resume for your dream job. Get suggestions or rewrite sections to be more impactful.
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="suggestions">Get Suggestions</TabsTrigger>
            <TabsTrigger value="rewrite">Rewrite Section</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestions">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="font-headline">Resume Suggestions</CardTitle>
                <CardDescription>Paste your resume and a job description to get AI-powered improvement suggestions.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...suggestionsForm}>
                  <form onSubmit={suggestionsForm.handleSubmit(onSuggestionsSubmit)} className="space-y-6">
                    <FormField control={suggestionsForm.control} name="resumeText" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Resume Text</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Paste your full resume text here..." {...field} rows={10} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={suggestionsForm.control} name="jobDescription" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Job Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Paste the job description here..." {...field} rows={8} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" disabled={isSuggestionsLoading} className="w-full sm:w-auto">
                      {isSuggestionsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                      Get Suggestions
                    </Button>
                  </form>
                </Form>
                {suggestionsResult && (
                  <Card className="mt-6 bg-background">
                    <CardHeader><CardTitle>AI Suggestions</CardTitle></CardHeader>
                    <CardContent>
                      <pre className="text-sm font-body whitespace-pre-wrap p-4 bg-muted/50 rounded-md">{suggestionsResult}</pre>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="rewrite">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="font-headline">Rewrite Resume Section</CardTitle>
                <CardDescription>Paste a section of your resume to have the AI rewrite it for a specific job.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...rewriteForm}>
                  <form onSubmit={rewriteForm.handleSubmit(onRewriteSubmit)} className="space-y-6">
                    <FormField control={rewriteForm.control} name="resumeSection" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume Section to Rewrite</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., your 'Work Experience' section..." {...field} rows={6} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={rewriteForm.control} name="jobDescription" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Job Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Paste the job description here..." {...field} rows={6} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={rewriteForm.control} name="userFeedback" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feedback (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., 'Make it more focused on leadership skills...'" {...field} rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" disabled={isRewriteLoading} className="w-full sm:w-auto">
                      {isRewriteLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                      Rewrite Section
                    </Button>
                  </form>
                </Form>
                {rewrittenSectionResult && (
                  <Card className="mt-6 bg-background">
                    <CardHeader><CardTitle>Rewritten Section</CardTitle></CardHeader>
                    <CardContent>
                      <pre className="text-sm font-body whitespace-pre-wrap p-4 bg-muted/50 rounded-md">{rewrittenSectionResult}</pre>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
