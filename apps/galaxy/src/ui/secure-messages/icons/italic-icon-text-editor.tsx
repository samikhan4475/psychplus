import { IconProps } from '@/types'

const ItalicIcon = (props: IconProps) => {
  return ` <svg
      width=${props.width ?? 12}
      height=${props.height ?? 14}
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 0V3H6.21L2.79 11H0V14H8V11H5.79L9.21 3H12V0H4Z"
        fill="#8B8D98"
      />
    </svg>`
}

export { ItalicIcon }
