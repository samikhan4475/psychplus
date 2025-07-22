import React from 'react'

const TreatmentTeamIcon = ({
  fill = '#8B8D98',
  height = '16',
  width = '16',
}: {
  fill?: string
  height?: string
  width?: string
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3307 3.33325V4.66659C12.4353 4.66659 13.3307 5.56202 13.3307 6.66659V13.9999C13.3307 14.3681 13.0323 14.6666 12.6641 14.6666H3.33073C2.96254 14.6666 2.66406 14.3681 2.66406 13.9999V6.66659C2.66406 5.56202 3.5595 4.66659 4.66406 4.66659V3.33325H11.3307ZM8.66406 7.33325H7.33073V8.66659H5.9974V9.99992H7.33006L7.33073 11.3333H8.66406L8.6634 9.99992H9.9974V8.66659H8.66406V7.33325ZM12.6641 1.33325V2.66659H3.33073V1.33325H12.6641Z"
        fill={fill}
      />
    </svg>
  )
}

export { TreatmentTeamIcon }
