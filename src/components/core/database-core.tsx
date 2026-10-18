'use client';

import { useEffect, useRef, useState } from 'react';

// Fixed full-screen canvas behind the story. three.js is loaded after the page
// renders so the text is never blocked by the 3D bundle.
export default function DatabaseCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import('./core-scene').then(({ createCoreScene }) => {
      if (cancelled || !canvasRef.current) return;
      dispose = createCoreScene(canvasRef.current);
      setReady(true);
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}
