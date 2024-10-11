import { IconProps } from '@/types'

const NotRequestedIcon = (props: IconProps) => {
  return (
    <svg
      width={props?.width ?? 16}
      height={props?.height ?? 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        className="stroke-pp-gray-3"
        strokeWidth="2"
      />
      <path d="M12 12L4 4" className="stroke-pp-gray-3" strokeWidth="2" />
    </svg>
  )
}

export { NotRequestedIcon }
