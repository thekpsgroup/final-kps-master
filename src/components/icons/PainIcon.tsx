export default function PainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="23" opacity="0.25" />
        <path d="M12 20l40 24M52 20L12 44" strokeLinecap="round" />
        <path d="M32 16v16" strokeLinecap="round" />
        <circle cx="32" cy="40" r="2.25" />
      </g>
    </svg>
  );
}
