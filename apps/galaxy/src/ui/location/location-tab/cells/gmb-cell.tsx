'use client'

import { PropsWithRow, TextCell } from '@/components'
import { Location } from '@/types'

const GMBCell = ({ row: { original } }: PropsWithRow<Location>) => (
  <TextCell>{original?.locationGoogleLink ? 'Yes' : 'No'}</TextCell>
)

export { GMBCell }
