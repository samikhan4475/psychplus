'use client'

import { TextCell, type PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Staff } from './types'

const StaffRoleCell = ({ row: { original: staff } }: PropsWithRow<Staff>) => {
  const codes = useCodesetCodes(CODESETS.StaffRole)
  const value = codes.filter((code) => code.value === staff.staffRoleCode)[0]
    ?.display

  return <TextCell>{value}</TextCell>
}

export { StaffRoleCell }
