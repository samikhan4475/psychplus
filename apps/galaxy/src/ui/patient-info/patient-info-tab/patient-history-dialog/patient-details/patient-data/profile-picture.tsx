'use client'

import { Avatar } from '@radix-ui/themes'
import { Box } from 'lucide-react'
import { PictureFallback } from '@/components/icons'

const ProfilePicture = () => {
  return (
    <Avatar
      size="9"
      color="gray"
      src="https://picsum.photos/500/500"
      fallback={
        <Box>
          <PictureFallback width={150} height={150} />
        </Box>
      }
      className="h-[150px] w-[150px]"
    />
  )
}

export { ProfilePicture }
