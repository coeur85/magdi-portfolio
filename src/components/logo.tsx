// AM monogram: the A's right leg doubles as the M's first stroke.
export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" aria-hidden="true" {...props}>
      <path d="M3 25 L9 7 L15 25 L15 7 L21.5 18 L28 7 L28 25" stroke="currentColor" />
      <path d="M5.8 18.5 H12.2" stroke="hsl(var(--accent))" />
    </svg>
  );
}
