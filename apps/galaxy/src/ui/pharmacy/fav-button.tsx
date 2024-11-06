'use client'

import { IconButton } from '@radix-ui/themes'
import { StarIcon } from 'lucide-react'

const FavButton = () => {
  return (
    <IconButton size="1" color="gray" variant="ghost" type="button">
      <StarIcon size={15} />
    </IconButton>
  )
}

export { FavButton }
