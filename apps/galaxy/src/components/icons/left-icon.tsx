import { IconProps } from '@/types'

const LeftIcon = ({ className, onClick, width, height }: IconProps) => {
  return (
    <svg
      width={width ?? 16}
      height={height ?? 16}
      className={className ?? ''}
      onClick={onClick}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.21879 5.33327H11.3332V6.6666H3.21879L6.79477 10.2425L5.85197 11.1853L0.666504 5.99993L5.85197 0.814453L6.79477 1.75726L3.21879 5.33327Z"
        fill="#60646C"
      />
    </svg>
  )
}

export { LeftIcon }
