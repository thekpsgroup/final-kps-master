export default function DreamIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 42h44" />
        <path d="M32 24a12 12 0 0 1 12 12" opacity="0.3" />
        <path d="M20 36a12 12 0 0 1 12-12" opacity="0.3" />
        <path d="M32 18v-6M20 22l-5-5M44 22l5-5M16 32h-6M48 32h6" strokeLinecap="round" />
        <path d="M14 46h36" opacity="0.5" />
        <path d="M18 50h28" opacity="0.3" />
      </g>
    </svg>
  );
}
