'use client'

import { PlusCircledIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { Organization } from '../types'

const RowActionAddPractice = ({
  row: { original: organization },
}: PropsWithRow<Organization>) => {
  const onOpenModal = () => {}

  return (
    <IconButton onClick={onOpenModal} size="1" color="gray" variant="ghost">
      <PlusCircledIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionAddPractice }
