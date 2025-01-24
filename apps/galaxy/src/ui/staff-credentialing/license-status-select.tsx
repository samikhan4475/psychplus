'use client'

import { SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { LicenseStatus } from './types'

const LicenseStatusSelect = ({
  statusFilter,
  setStatusFilters,
}: {
  statusFilter: LicenseStatus | undefined
  setStatusFilters: (filters: LicenseStatus) => void
}) => {
  const options = useCodesetOptions(CODESETS.LicenseStatus)
  return (
    <SelectCell
      value={statusFilter}
      options={options}
      onValueChange={(value) => setStatusFilters(value as LicenseStatus)}
    />
  )
}

export { LicenseStatusSelect }
