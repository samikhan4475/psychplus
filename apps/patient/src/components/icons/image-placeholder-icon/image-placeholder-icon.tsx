import { IconProps } from '../types'

const ImagePlaceholderIcon = (props: IconProps) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.width  || "24"}
    height={props?.height || "24"}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="#194595"
      strokeLinecap="round"
      strokeWidth="1.5"
      d="M17 9.002c2.175.012 3.353.109 4.121.877C22 10.758 22 12.172 22 15v1c0 2.829 0 4.243-.879 5.122C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.878C2 20.242 2 18.829 2 16v-1c0-2.828 0-4.242.879-5.121.768-.768 1.946-.865 4.121-.877"
    ></path>
    <path
      stroke="#194595"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 14.998v-13m0 0 3 3.5m-3-3.5-3 3.5"
    ></path>
  </svg>
  )
}

export { ImagePlaceholderIcon }

