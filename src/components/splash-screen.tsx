
'use client';

import { BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
        className="flex items-center gap-4"
      >
        <BrainCircuit className="h-16 w-16 text-accent animate-pulse" />
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold font-headline">Magdi Portfolio</h1>
            <p className="text-muted-foreground">Loading awesome stuff...</p>
        </div>
      </motion.div>
    </div>
  );
}
