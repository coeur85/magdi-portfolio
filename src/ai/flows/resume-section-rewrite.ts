'use server';

/**
 * @fileOverview A flow for rewriting a specific section of a resume based on a job description.
 *
 * - rewriteResumeSection - A function that handles the resume section rewriting process.
 * - RewriteResumeSectionInput - The input type for the rewriteResumeSection function.
 * - RewriteResumeSectionOutput - The return type for the rewriteResumeSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteResumeSectionInputSchema = z.object({
  resumeSection: z.string().describe('The specific section of the resume to rewrite.'),
  jobDescription: z.string().describe('The job description to tailor the resume section to.'),
  userFeedback: z.string().optional().describe('Optional user feedback on previous rewrites.'),
});
export type RewriteResumeSectionInput = z.infer<typeof RewriteResumeSectionInputSchema>;

const RewriteResumeSectionOutputSchema = z.object({
  rewrittenSection: z.string().describe('The rewritten section of the resume.'),
});
export type RewriteResumeSectionOutput = z.infer<typeof RewriteResumeSectionOutputSchema>;

export async function rewriteResumeSection(input: RewriteResumeSectionInput): Promise<RewriteResumeSectionOutput> {
  return rewriteResumeSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteResumeSectionPrompt',
  input: {schema: RewriteResumeSectionInputSchema},
  output: {schema: RewriteResumeSectionOutputSchema},
  prompt: `You are an expert resume writer. Your goal is to rewrite a specific section of a resume to be more impactful and relevant to a specific job description.

  Here is the resume section to rewrite:
  {{resumeSection}}

  Here is the job description to tailor the resume section to:
  {{jobDescription}}

  {{#if userFeedback}}
  Here is some user feedback on previous rewrites. Take this feedback into account when rewriting the resume section:
  {{userFeedback}}
  {{/if}}

  Rewrite the resume section to be more impactful and relevant to the job description. Focus on clarity, impact, and keyword optimization.
  `,
});

const rewriteResumeSectionFlow = ai.defineFlow(
  {
    name: 'rewriteResumeSectionFlow',
    inputSchema: RewriteResumeSectionInputSchema,
    outputSchema: RewriteResumeSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
