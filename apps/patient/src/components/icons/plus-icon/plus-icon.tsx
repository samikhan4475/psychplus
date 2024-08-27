import { IconProps } from '../types'

const PlusIcon = (props: IconProps) => {
  return (
    <svg 
      width={props.width ?? 10}
      height={props.height ?? 10}  
      viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.4165 4.41663V0.916626H5.58317V4.41663H9.08317V5.58329H5.58317V9.08329H4.4165V5.58329H0.916504V4.41663H4.4165Z" fill="#8B8D98"/>
    </svg>
  )
}

export { PlusIcon }
