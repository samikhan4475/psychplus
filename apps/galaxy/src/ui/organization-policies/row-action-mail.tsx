'use client'

import { type PropsWithRow } from '@/components'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { Policy } from './types'

const RowActionMail = ({
  row: { original: record },
}: PropsWithRow<Policy>) => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <EnvelopeClosedIcon width={12} height={12} className="text-black" />
    </IconButton>
  )
}

export { RowActionMail }
