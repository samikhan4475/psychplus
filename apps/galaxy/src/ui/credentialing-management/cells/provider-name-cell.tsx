'use client'

import { TextCell, type PropsWithRow } from '@/components'
import { License } from '../types'

const ProviderNameCell = ({
  row: { original: record },
}: PropsWithRow<License>) => {
  return (
    <TextCell className="pl-1">
      {record?.legalName.firstName} {record?.legalName.lastName},{' '}
      {record?.legalName.honors}
      {record?.staffId}
    </TextCell>
  )
}

export { ProviderNameCell }
