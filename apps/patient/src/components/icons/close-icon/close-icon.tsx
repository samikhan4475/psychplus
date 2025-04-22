import { IconProps } from '../types'

const CloseIcon = ({ width, height, ...props }: IconProps) => {
  return (
    <svg
      width={width ?? 16}
      height={height ?? 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1"
        y="1"
        width="13.3333"
        height="13.3333"
        rx="6.66667"
        className="fill-red-3"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.66667 1C3.98 1 1 3.98 1 7.66667C1 11.3533 3.98 14.3333 7.66667 14.3333C11.3533 14.3333 14.3333 11.3533 14.3333 7.66667C14.3333 3.98 11.3533 1 7.66667 1ZM7.66667 13C4.72667 13 2.33333 10.6067 2.33333 7.66667C2.33333 4.72667 4.72667 2.33333 7.66667 2.33333C10.6067 2.33333 13 4.72667 13 7.66667C13 10.6067 10.6067 13 7.66667 13ZM7.66667 6.72667L10.06 4.33333L11 5.27333L8.60667 7.66667L11 10.06L10.06 11L7.66667 8.60667L5.27333 11L4.33333 10.06L6.72667 7.66667L4.33333 5.27333L5.27333 4.33333L7.66667 6.72667Z"
        className="fill-red-9"
      />
    </svg>
  )
}

export { CloseIcon }
