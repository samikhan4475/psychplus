'use client'

import { type PropsWithRow } from '@/components'
import { EdiDialog } from '../dialogs'
import { EdiItem } from '../types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<EdiItem>) => {
  return <EdiDialog data={record} />
}

export { RowActionEdit }
