'use client'

import { Flex } from '@radix-ui/themes'
import { PhotoCard } from './shared'

const PhotoCards = () => {
  return (
    <Flex gap="1" className="col-span-4">
      <PhotoCard
        title="Insurance Photo Front"
        src="https://picsum.photos/500/500"
        controls
      />
      <PhotoCard
        title="Insurance Photo Back"
        src="https://picsum.photos/500/500"
        controls
      />
    </Flex>
  )
}

export { PhotoCards }
