'use client'

import { type PropsWithRow } from '@/components'
import { Message2Icon } from '@/components/icons'
import { IconButton } from '@radix-ui/themes'
import { Policy } from './types'

const RowActionChat = ({
  row: { original: record },
}: PropsWithRow<Policy>) => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <Message2Icon width={14} height={14} />
    </IconButton>
  )
}

export { RowActionChat }
