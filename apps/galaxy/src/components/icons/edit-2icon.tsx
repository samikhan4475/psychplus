import { IconProps } from '@/types'

const Edit2Icon = (props: IconProps) => {
  return (
    <svg
      width={props.width ?? 18}
      height={props.height ?? 18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.81066 11.9174L12.4172 4.31077L11.3566 3.25012L3.75 10.8567V11.9174H4.81066ZM5.43198 13.4174H2.25V10.2354L10.8263 1.65913C11.1192 1.36623 11.594 1.36623 11.8869 1.65913L14.0083 3.78044C14.3011 4.07334 14.3011 4.54821 14.0083 4.84111L5.43198 13.4174ZM2.25 14.9174H15.75V16.4174H2.25V14.9174Z"
        fill={props.fill ?? '#24366B'}
      />
    </svg>
  )
}

export { Edit2Icon }
