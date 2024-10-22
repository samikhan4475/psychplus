import { IconProps } from '@/types'

const RoundTickIcon = ({ width, height, ...rest }: IconProps) => {
  return (
    <svg
      width={width ?? 17}
      height={height ?? 16}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect
        x="1.5"
        y="1"
        width="13.3333"
        height="13.3333"
        rx="6.66667"
        className="fill-pp-green-100"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.16667 1C4.48667 1 1.5 3.98667 1.5 7.66667C1.5 11.3467 4.48667 14.3333 8.16667 14.3333C11.8467 14.3333 14.8333 11.3467 14.8333 7.66667C14.8333 3.98667 11.8467 1 8.16667 1ZM8.16667 12.9997C5.22667 12.9997 2.83333 10.6063 2.83333 7.66634C2.83333 4.72634 5.22667 2.33301 8.16667 2.33301C11.1067 2.33301 13.5 4.72634 13.5 7.66634C13.5 10.6063 11.1067 12.9997 8.16667 12.9997ZM6.83333 9.11306L11.2267 4.71973L12.1667 5.66639L6.83333 10.9997L4.16667 8.33306L5.10667 7.39306L6.83333 9.11306Z"
        className="fill-pp-states-success"
      />
    </svg>
  )
}

export { RoundTickIcon }
