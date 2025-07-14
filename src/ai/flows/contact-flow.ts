'use server';
/**
 * @fileOverview A contact form submission handler.
 *
 * - processContactMessage - A function that handles the contact form submission.
 * - ContactFormInput - The input type for the processContactMessage function.
 * - ContactFormOutput - The return type for the processContactMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { saveContactSubmission } from '@/services/contact-service';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email of the person sending the message.'),
  message: z.string().describe('The message content.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  category: z.enum(['Inquiry', 'Job Offer', 'Collaboration', 'Feedback', 'Other'])
    .describe('The category of the contact message.'),
  summary: z.string().describe('A one-sentence summary of the message.'),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function processContactMessage(input: ContactFormInput): Promise<ContactFormOutput> {
  return contactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactFormPrompt',
  input: {schema: ContactFormInputSchema},
  output: {schema: ContactFormOutputSchema},
  prompt: `You are a personal assistant for Ahmed Magdi. A user has submitted a contact form.
Your task is to analyze the message and categorize it. The user's name is {{name}} and their email is {{email}}.

Here is the message:
"{{message}}"

Categorize the message into one of the following categories: Inquiry, Job Offer, Collaboration, Feedback, or Other.
Then, provide a one-sentence summary of the message.
`,
});

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    
    if (output) {
      await saveContactSubmission({
        ...input,
        ...output,
        createdAt: new Date(),
      });
    }

    return output!;
  }
);
