'use server';

import { resumeRewriteSuggestions, ResumeRewriteSuggestionsInput } from '@/ai/flows/resume-rewrite-suggestions';
import { rewriteResumeSection, RewriteResumeSectionInput } from '@/ai/flows/resume-section-rewrite';

export async function getResumeSuggestions(data: ResumeRewriteSuggestionsInput) {
    try {
        const result = await resumeRewriteSuggestions(data);
        return { success: true, suggestions: result.suggestions };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to get suggestions. Please try again.' };
    }
}

export async function getRewrittenSection(data: RewriteResumeSectionInput) {
    try {
        const result = await rewriteResumeSection(data);
        return { success: true, rewrittenSection: result.rewrittenSection };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to rewrite section. Please try again.' };
    }
}
