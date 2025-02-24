import { IconProps } from '@/types'

const FileListIcon = (props: IconProps) => {
  return (
    <svg
      width={props.width ?? 14}
      height={props.height ?? 14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 12.8333H2.33333C2.01117 12.8333 1.75 12.5721 1.75 12.25V1.74996C1.75 1.4278 2.01117 1.16663 2.33333 1.16663H11.6667C11.9888 1.16663 12.25 1.4278 12.25 1.74996V12.25C12.25 12.5721 11.9888 12.8333 11.6667 12.8333ZM11.0833 11.6666V2.33329H2.91667V11.6666H11.0833ZM4.66667 4.08329H9.33333V5.24996H4.66667V4.08329ZM4.66667 6.41663H9.33333V7.58329H4.66667V6.41663ZM4.66667 8.74996H9.33333V9.91663H4.66667V8.74996Z"
        fill={props.fill ?? '#1C2024'}
      />
    </svg>
  )
}

export { FileListIcon }
