import { IconProps } from '@/types'

interface ErrorIconProps extends IconProps {
  iconColor?: string
}

export const ErrorIcon = (props: ErrorIconProps) => {
  const { iconColor = 'fill-red-10' } = props
  return (
    <svg
      {...props}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"
        className={iconColor}
      />
    </svg>
  )
}
