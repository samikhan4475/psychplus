'use client'

import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const ServiceCell = ({ row: { original } }: PropsWithRow<Appointment>) => {
  const codes = useCodesetCodes(CODESETS.ServicesOffered)
  return (
    <TextCell className="whitespace-nowrap">
      {getCodesetDisplayName(original.service, codes)}
    </TextCell>
  )
}

export { ServiceCell }
