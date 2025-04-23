'use client'

import { Checkbox } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import type { PatientMedication } from '../types'

const RowActionCheckbox = ({ row }: PropsWithRow<PatientMedication>) => {
  return <Checkbox size="1" highContrast disabled />
}

export { RowActionCheckbox }
