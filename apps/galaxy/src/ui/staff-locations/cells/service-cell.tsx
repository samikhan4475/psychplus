'use client'

import { LongTextCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { StaffLocation } from '../types'
import { getServicesLabel } from '../utils'

const ServiceCell = ({ row: { original } }: PropsWithRow<StaffLocation>) => {
  const options = useCodesetOptions(CODESETS.ServicesOffered)

  return (
    <LongTextCell className="min-w-40 line-clamp-3">
      {getServicesLabel(original?.location?.locationServices ?? [], options)}
    </LongTextCell>
  )
}

export { ServiceCell }
