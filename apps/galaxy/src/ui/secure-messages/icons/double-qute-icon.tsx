import { IconProps } from '@/types'

const DoubleQuteIcon = (props: IconProps) => {
  return `<svg
      width=${props.width ?? 14}
      height=${props.height ?? 10}
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 10H4L6 6V0H0V6H3L1 10ZM9 10H12L14 6V0H8V6H11L9 10Z"
        fill="#8B8D98"
      />
    </svg>`
}

export { DoubleQuteIcon }
