export function ExcelIcon({ className = "", size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M95 95H1V1H67L95 29V95Z" fill="#185C37"/>
      <path d="M67 1L95 29H67V1Z" fill="#21A366"/>
      <path d="M32 41H16V71H32V41Z" fill="white"/>
      <path d="M64 41H48V71H64V41Z" fill="white"/>
      <path d="M48 41H32V71H48V41Z" fill="#107C41"/>
    </svg>
  )
}

