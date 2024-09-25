'use client'

import { Avatar } from '@radix-ui/themes'
import { Box } from 'lucide-react'
import { PictureFallback } from '@/components/icons'

const DrivingLicense = () => {
  return (
    <Avatar
      size="9"
      color="gray"
      src="https://picsum.photos/500/500"
      fallback={
        <Box>
          <PictureFallback width={250} height={150} />
        </Box>
      }
      className="h-[150px] w-[250px]"
    />
  )
}

export { DrivingLicense }
