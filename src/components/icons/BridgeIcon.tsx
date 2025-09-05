export default function BridgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 40h48" />
        <path d="M12 40c8-10 32-10 40 0" />
        <path d="M20 40V26M44 40V26" />
        <path d="M20 26c0 0 6 6 12 6s12-6 12-6" opacity="0.6" />
        <path d="M12 40v6M52 40v6" />
      </g>
    </svg>
  );
}
