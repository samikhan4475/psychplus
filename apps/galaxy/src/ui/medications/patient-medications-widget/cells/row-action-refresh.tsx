'use client'

import { IconButton } from '@radix-ui/themes'
import { RefreshCw } from 'lucide-react'
import { type PropsWithRow } from '@/components'
import { PatientMedication } from '../types'

const RowActionRefresh = ({
  row: { original: record },
}: PropsWithRow<PatientMedication>) => {
  const onRefresh = () => {
    // modal open code
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onRefresh}>
      <RefreshCw size={18} color="black" />
    </IconButton>
  )
}

export { RowActionRefresh }
