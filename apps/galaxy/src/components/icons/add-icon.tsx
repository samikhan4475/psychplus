import { IconProps } from '@/types'

const AddIcon = (props: IconProps) => {
  return (
    <svg 
      width = { props.width ?? 10 }
      height = { props.height ?? 10 } 
      viewBox="0 0 10 10" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.33337 4.3335V0.333496H5.66671V4.3335H9.66671V5.66683H5.66671V9.66683H4.33337V5.66683H0.333374V4.3335H4.33337Z" fill="white" />
    </svg>
  )
}

export { AddIcon }
