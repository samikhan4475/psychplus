import { IconProps } from '@/types'

const ForwardIcon = (props: IconProps) => {
  return (
    <svg
      width={props.width ?? 17}
      height={props.height ?? 14}
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.83333 9.66683H7.16667C4.28502 9.66683 1.78294 11.292 0.526992 13.6757C0.509108 13.4529 0.5 13.2276 0.5 13.0002C0.5 8.39783 4.23096 4.66683 8.83333 4.66683V0.0834961L17.5833 7.16683L8.83333 14.2502V9.66683ZM7.16667 8.00016H10.5V10.7567L14.9345 7.16683L10.5 3.57703V6.3335H8.83333C6.81625 6.3335 5.00843 7.22925 3.78593 8.64475C4.84061 8.22633 5.98368 8.00016 7.16667 8.00016Z"
        fill="#60646C"
      />
    </svg>
  )
}

export { ForwardIcon }
