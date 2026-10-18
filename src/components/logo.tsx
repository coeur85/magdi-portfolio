// "am_" prompt: lowercase am followed by a blue cursor, like a SQL or terminal prompt.
// The viewBox is cropped to the glyphs, so size it at a 5:2 ratio (e.g. h-4 w-10).
export function Logo({ blink = false, ...props }: React.SVGProps<SVGSVGElement> & { blink?: boolean }) {
  return (
    <svg
      viewBox="2 18 45 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="9.6" cy="27" r="5.6" />
      <path d="M15.2 21.4 V32.6 M19.6 32.6 V21.4 M19.6 25.4 a4 4 0 0 1 8 0 V32.6 M27.6 25.4 a4 4 0 0 1 8 0 V32.6" />
      <rect
        x="38.4"
        y="29.4"
        width="7"
        height="3.2"
        rx="1"
        fill="hsl(var(--accent))"
        stroke="none"
        className={blink ? 'motion-safe:animate-cursor' : undefined}
      />
    </svg>
  );
}
