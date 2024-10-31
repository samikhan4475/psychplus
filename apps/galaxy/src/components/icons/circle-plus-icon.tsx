import React from 'react'
import { IconProps } from '@/types'

const CirclePlusIcon = ({ className, onClick, width, height }: IconProps) => (
  <svg
    width={width ?? 16}
    height={height ?? 15}
    className={className ?? ''}
    onClick={onClick}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.3335 6.33203V3.66536H7.66683V6.33203H10.3335V7.66536H7.66683V10.332H6.3335V7.66536H3.66683V6.33203H6.3335ZM7.00016 13.6654C3.31826 13.6654 0.333496 10.6806 0.333496 6.9987C0.333496 3.3168 3.31826 0.332031 7.00016 0.332031C10.682 0.332031 13.6668 3.3168 13.6668 6.9987C13.6668 10.6806 10.682 13.6654 7.00016 13.6654ZM7.00016 12.332C9.9457 12.332 12.3335 9.94423 12.3335 6.9987C12.3335 4.05318 9.9457 1.66536 7.00016 1.66536C4.05464 1.66536 1.66683 4.05318 1.66683 6.9987C1.66683 9.94423 4.05464 12.332 7.00016 12.332Z"
      className="fill-blue-11"
    />
  </svg>
)

export default CirclePlusIcon
