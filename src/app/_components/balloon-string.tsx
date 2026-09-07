type BalloonStringProps = {
  className?: string;
};

export function BalloonString({ className = "" }: BalloonStringProps) {
  return (
    <svg
      className={`balloon-string ${className}`.trim()}
      viewBox="0 0 60 112"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M30 1C9 24 48 43 31 69C18 89 19 101 38 111" />
    </svg>
  );
}
