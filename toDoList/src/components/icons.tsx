interface IconProps {
  className?: string
}

export const PlayIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
  >
    <path d="M8 5.5v13l10-6.5-10-6.5z" fill="currentColor" />
  </svg>
)

export const StopIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
  >
    <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
  </svg>
)

export const TrashIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
  >
    <path
      d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v8h-2V9zm4 0h2v8h-2V9z"
      fill="currentColor"
    />
  </svg>
)

