'use client'

import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { Edit2Icon } from '@/components/icons'
import { AllergyDataResponse } from '../types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<AllergyDataResponse>) => {
  const onEdit = () => {
    // TODO: implement handler for opening the modal
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onEdit}>
      <Edit2Icon
        width={16}
        height={16}
        className="cursor-pointer"
        fill="black"
      />
    </IconButton>
  )
}

export { RowActionEdit }
