import { IconProps } from '@/types'

const TableEditIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width?? 17}
      height={props.height?? 17}
      viewBox="0 0 17 17"
      fill="none"
    >
      <path
        d="M4.66322 11.458L11.4246 4.69657L10.4818 3.75377L3.72042 10.5152L3.72042 11.458L4.66322 11.458ZM5.21551 12.7913L2.38708 12.7913L2.38708 9.96293L10.0104 2.33955C10.2708 2.0792 10.6929 2.0792 10.9532 2.33955L12.8389 4.22517C13.0992 4.48552 13.0992 4.90763 12.8389 5.16798L5.21551 12.7913ZM2.38708 14.1247L14.3871 14.1247L14.3871 15.458L2.38708 15.458L2.38708 14.1247Z"
        fill="#1C2024"
      />
    </svg>
  )
}

export { TableEditIcon }
