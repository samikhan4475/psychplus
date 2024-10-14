import { IconProps } from '@/types'

const DeleteIcon = (props: IconProps) => {
  return (
    <svg
      width={props.width ?? 16}
      height={props.height ?? 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.66659 2.66668V1.33334H11.3333V2.66668H14.6666V4.00001H13.3333V14C13.3333 14.3682 13.0348 14.6667 12.6666 14.6667H3.33325C2.96507 14.6667 2.66659 14.3682 2.66659 14V4.00001H1.33325V2.66668H4.66659ZM3.99992 4.00001V13.3333H11.9999V4.00001H3.99992ZM5.99992 6.00001H7.33325V11.3333H5.99992V6.00001ZM8.66659 6.00001H9.99992V11.3333H8.66659V6.00001Z" fill="black" />
    </svg>
  )
}

export { DeleteIcon }
