import { IconProps } from '@/types'

interface TabletLineIconProps extends IconProps {
  color?: string
}

const TabletLineIcon = ({ color, ...props }: TabletLineIconProps) => {
  return (
    <svg
      width={props.width ?? 16}
      height={props.height ?? 20}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 18L14 2L2 2L2 18L14 18ZM15 20L1 20C0.447701 20 0 19.5523 0 19L0 1C0 0.447701 0.447701 0 1 0L15 0C15.5523 0 16 0.447701 16 1L16 19C16 19.5523 15.5523 20 15 20ZM8 5C7.4477 5 7 4.5523 7 4C7 3.4477 7.4477 3 8 3C8.5523 3 9 3.4477 9 4C9 4.5523 8.5523 5 8 5Z"
        fill={color ?? '#8B8D98'}
      />
    </svg>
  )
}

export { TabletLineIcon }
