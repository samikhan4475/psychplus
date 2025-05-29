import { IconProps } from '@/types'

interface SheildLineIconProps extends IconProps {
  color?: string
}
const SheildLineIcon = ({ color, ...props }: SheildLineIconProps) => {
  return (
    <svg
      width={props.width ?? 22}
      height={props.height ?? 18}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.2169 21.174L12 23L3.7831 21.174C3.3255 21.0723 3 20.6665 3 20.1978L3 10.2111C3 8.205 4.0026 6.3316 5.6718 5.2188L12 1L18.3282 5.2188C19.9974 6.3316 21 8.205 21 10.2111L21 20.1978C21 20.6665 20.6745 21.0723 20.2169 21.174ZM19 19.3957L19 10.2111C19 8.8737 18.3316 7.6248 17.2188 6.8829L12 3.4037L6.7812 6.8829C5.6684 7.6248 5 8.8737 5 10.2111L5 19.3957L12 20.9512L19 19.3957Z"
        fill={color ?? '#8B8D98'}
      />
    </svg>
  )
}

export { SheildLineIcon }
