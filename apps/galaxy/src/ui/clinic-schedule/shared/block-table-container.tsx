import { PropsWithChildren } from 'react'
import { Box, BoxProps } from '@radix-ui/themes'

const BlockTableContainer = ({
  children,
  ...rest
}: PropsWithChildren<BoxProps>) => {
  return (
    <Box className="border-pp-focus-bg rounded-[4px] border p-1.5" {...rest}>
      {children}
    </Box>
  )
}

export { BlockTableContainer }
