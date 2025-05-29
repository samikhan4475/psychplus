import { IconProps } from '@/types'

const CheckBoxCircleIcon = (props: IconProps) => {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 27.3332C6.63616 27.3332 0.666626 21.3636 0.666626 13.9998C0.666626 6.63604 6.63616 0.666504 14 0.666504C21.3637 0.666504 27.3333 6.63604 27.3333 13.9998C27.3333 21.3636 21.3637 27.3332 14 27.3332ZM12.6701 19.3332L22.0982 9.90508L20.2126 8.01946L12.6701 15.562L8.89891 11.7906L7.01328 13.6764L12.6701 19.3332Z"
        fill="#30A46C"
      />
    </svg>
  )
}

export { CheckBoxCircleIcon }
