'use client'

import { Flex, IconButton } from '@radix-ui/themes'
import { PencilLine } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { WaitlistResponse } from '@/types'
import DeleteWaitlistButton from './delete-waitlist-button'
import { useStore } from './store'
import { WaitlistHistory } from './waitlist-history'

const ActionsCell = ({ row: { original } }: PropsWithRow<WaitlistResponse>) => {
  const { setIsOpen, setFormData } = useStore()

  return (
    <Flex className="gap-1">
      <WaitlistHistory id={original?.id} />
      <DeleteWaitlistButton original={original} />
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        className="text-black !m-0"
        type="button"
        onClick={() => {
          setIsOpen(true)
          if (!setFormData) return
          setFormData(original)
        }}
      >
        <PencilLine size={14} />
      </IconButton>
    </Flex>
  )
}

export { ActionsCell }
