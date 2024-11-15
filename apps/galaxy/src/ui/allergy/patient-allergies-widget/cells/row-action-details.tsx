'use client'

import { IconButton } from '@radix-ui/themes'
import { Eye } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import { AllergyDataResponse } from '../types'

const RowActionDetails = ({
  row: { original: record },
}: PropsWithRow<AllergyDataResponse>) => {
  const onEdit = () => {
    // TODO: implement handler for opening the modal
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onEdit}>
      <Eye color="black" height="14" width="14" />
    </IconButton>
  )
}

export { RowActionDetails }
