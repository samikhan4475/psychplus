import { IconProps } from '@/types'

const PlusIcon = ({ width, height }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 12}
      height={height ?? 12}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M5.16669 5.16669V0.166687H6.83335V5.16669H11.8334V6.83335H6.83335V11.8334H5.16669V6.83335H0.166687V5.16669H5.16669Z"
        fill="white"
      />
    </svg>
  )
}

export { PlusIcon }
