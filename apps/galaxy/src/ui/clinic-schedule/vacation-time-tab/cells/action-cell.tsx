'use client'

import { Flex, IconButton } from '@radix-ui/themes'
import { CloseIcon } from '@/components/icons'
import { EditVacationButton } from '../edit-vacation-button'

const ActionCell = () => {
  return (
    <Flex gap="1">
      <IconButton variant="ghost">
        <CloseIcon width={16} height={16} />
      </IconButton>
      <EditVacationButton />
    </Flex>
  )
}

export { ActionCell }
