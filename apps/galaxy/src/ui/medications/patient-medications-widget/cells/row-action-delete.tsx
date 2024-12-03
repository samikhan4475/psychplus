'use client'

import { IconButton } from '@radix-ui/themes'
import { XCircle } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import { PatientMedication } from '../types'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<PatientMedication>) => {
  const onDelete = () => {
    // modal open code
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onDelete}>
      <XCircle size={18} color="black" />
    </IconButton>
  )
}

export { RowActionDelete }
