'use client'

import { Flex } from '@radix-ui/themes'
import { FavButton } from './fav-button'
import { TrashButton } from './trash-button'

const ActionsCell = () => {
  return (
    <Flex gap="1">
      <TrashButton />
      <FavButton />
    </Flex>
  )
}

export { ActionsCell }
