import { IconProps } from '@/types'

const NoteIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 21}
      height={props.height ?? 20}
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M11.5 18V20H9.5V18H1.5C0.94772 18 0.5 17.5523 0.5 17V1C0.5 0.44772 0.94772 0 1.5 0H7.5C8.6947 0 9.7671 0.52375 10.5 1.35418C11.2329 0.52375 12.3053 0 13.5 0H19.5C20.0523 0 20.5 0.44772 20.5 1V17C20.5 17.5523 20.0523 18 19.5 18H11.5ZM18.5 16V2H13.5C12.3954 2 11.5 2.89543 11.5 4V16H18.5ZM9.5 16V4C9.5 2.89543 8.6046 2 7.5 2H2.5V16H9.5Z"
        fill="black"
      />
    </svg>
  )
}

export { NoteIcon }
