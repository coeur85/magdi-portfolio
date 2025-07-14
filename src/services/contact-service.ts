import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { ContactFormInput, ContactFormOutput } from '@/ai/flows/contact-flow';

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  // If a service account key is not provided, the SDK will try to use
  // Application Default Credentials. This works well in Google Cloud environments.
  initializeApp();
}

const db = getFirestore();

interface ContactSubmission extends ContactFormInput, ContactFormOutput {
    createdAt: Date;
}

/**
 * Saves a contact form submission to the 'contact-submissions' collection in Firestore.
 * @param submission - The contact submission data.
 * @returns The ID of the newly created document.
 */
export async function saveContactSubmission(submission: ContactSubmission): Promise<string> {
    try {
        const docRef = await db.collection('contact-submissions').add(submission);
        console.log('Document written with ID: ', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding document: ', error);
        throw new Error('Failed to save contact submission.');
    }
}
