import { IconProps } from '@/types'

const MegaPhoneIcon = ({ width = 13, height = 13, ...props }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 9.333S8.667 10 10.667 12h.666a.667.667 0 00.667-.667V7.291a1.334 1.334 0 000-2.582V.667A.667.667 0 0011.333 0h-.666C8.667 2 4 2.667 4 2.667H1.333C.597 2.667 0 3.264 0 4v4c0 .736.597 1.333 1.333 1.333H2l.667 3.334H4V9.333zm1.333-5.559a22.64 22.64 0 001.627-.412c1.118-.329 2.54-.847 3.707-1.646v8.568C9.5 9.484 8.078 8.967 6.96 8.638a22.64 22.64 0 00-1.627-.412V3.774zm-4 .226H4v4H1.333V4z"
        className="fill-pp-bg-primary"
      />
    </svg>
  )
}

export { MegaPhoneIcon }
