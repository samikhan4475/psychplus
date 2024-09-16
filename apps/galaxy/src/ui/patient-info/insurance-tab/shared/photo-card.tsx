'use client'

import { Avatar, Box, Flex, Text } from '@radix-ui/themes'
import { CameraIcon, ImageEditIcon, ViewIcon } from '@/components/icons'

interface PhotoCardProps {
  title?: string
  controls?: boolean
  className?: string
  src: string
}
const PhotoCard = ({ title, controls, className, src }: PhotoCardProps) => {
  return (
    <Flex gap="2" direction="column" className={className}>
      {title && (
        <Text size="1" weight="medium">
          {title}
        </Text>
      )}
      <Box className="border-pp-focus-outline w-fit rounded-2 border border-dashed p-1">
        <Avatar
          src={src}
          alt={title ?? ''}
          className="min-h-[130px] min-w-[200px] max-w-[200px] rounded-1 shadow-3"
          fallback={<></>}
        />
      </Box>
      {controls && (
        <Flex align="center" gap="3">
          <ViewIcon />
          <ImageEditIcon />
          <CameraIcon />
        </Flex>
      )}
    </Flex>
  )
}

export { PhotoCard }
