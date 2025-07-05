export interface IconProps {
  width?: string | number
  height?: string | number
  onClick?: (e: React.MouseEvent<HTMLButtonElement | SVGElement>) => void
  className?: string
  fill?: string
}
