'use client'

import { useState } from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { PencilLine } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { WaitlistResponse } from '@/types'
import { AddWaitlistModal } from './add-waitlist-modal'
import DeleteWaitlistButton from './delete-waitlist-button'
import { WaitlistHistory } from './waitlist-history'

const ActionsCell = ({ row: { original } }: PropsWithRow<WaitlistResponse>) => {
  const [open, setOpen] = useState(false)
  const toggleModal = () => setOpen((prev) => !prev)

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
        onClick={toggleModal}
      >
        <PencilLine size={14} />
      </IconButton>
      {open && (
        <AddWaitlistModal
          isOpen={open}
          closeDialog={toggleModal}
          data={original}
        />
      )}
    </Flex>
  )
}

export { ActionsCell }
