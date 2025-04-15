import { LongTextCell, PropsWithRow } from '@/components'
import { StaffLocation } from '../types'
import { getServicesLabel } from '../utils'

const ServiceLevelsCell = ({ row: { original } }: PropsWithRow<StaffLocation>) => {
  return (
    <LongTextCell className="min-w-40 line-clamp-3">
      {getServicesLabel(original?.serviceLevelCodes ?? [])}
    </LongTextCell>
  )
}

export { ServiceLevelsCell }
