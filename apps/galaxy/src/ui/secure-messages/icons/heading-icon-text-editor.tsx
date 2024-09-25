import { IconProps } from '@/types'

const HeadingIcon = (props: IconProps) => {
  return `<svg
      width=${props.width ?? 12}
      height=${props.height ?? 15}
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7822 15H8.85254V8.90625H3.13965V15H0.209961V0.78125H3.13965V6.54297H8.85254V0.78125H11.7822V15Z"
        fill="#8B8D98"
      />
    </svg>`
}

export { HeadingIcon }
