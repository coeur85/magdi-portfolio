'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing resume rewrite suggestions based on a job description.
 *
 * - resumeRewriteSuggestions - A function that takes a resume and job description as input and returns AI-powered suggestions.
 * - ResumeRewriteSuggestionsInput - The input type for the resumeRewriteSuggestions function.
 * - ResumeRewriteSuggestionsOutput - The return type for the resumeRewriteSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeRewriteSuggestionsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be improved.'),
  jobDescription: z
    .string()
    .describe('The job description to tailor the resume towards.'),
});
export type ResumeRewriteSuggestionsInput = z.infer<
  typeof ResumeRewriteSuggestionsInputSchema
>;

const ResumeRewriteSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'AI-powered suggestions on how to improve the resume to better match the job description, focusing on keyword optimization and clarity.'
    ),
});
export type ResumeRewriteSuggestionsOutput = z.infer<
  typeof ResumeRewriteSuggestionsOutputSchema
>;

export async function resumeRewriteSuggestions(
  input: ResumeRewriteSuggestionsInput
): Promise<ResumeRewriteSuggestionsOutput> {
  return resumeRewriteSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeRewriteSuggestionsPrompt',
  input: {schema: ResumeRewriteSuggestionsInputSchema},
  output: {schema: ResumeRewriteSuggestionsOutputSchema},
  prompt: `You are an expert resume writer. Given the following resume and job description, provide suggestions on how to improve the resume to better match the job description. Focus on keyword optimization and clarity.

Resume:
{{resumeText}}

Job Description:
{{jobDescription}}`,
});

const resumeRewriteSuggestionsFlow = ai.defineFlow(
  {
    name: 'resumeRewriteSuggestionsFlow',
    inputSchema: ResumeRewriteSuggestionsInputSchema,
    outputSchema: ResumeRewriteSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
