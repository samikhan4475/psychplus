'use client'

import { type PropsWithRow } from '@/components'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { Policy } from './types'
import { Mail1Icon, Mail2Icon, MailIcon } from '@/components/icons'

const RowActionMail = ({
  row: { original: record },
}: PropsWithRow<Policy>) => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <Mail2Icon className="text-black" />
    </IconButton>
  )
}

export { RowActionMail }
