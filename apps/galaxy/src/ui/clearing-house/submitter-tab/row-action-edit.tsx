'use client'

import { type PropsWithRow } from '@/components'
import { SubmitterDialog } from '../dialogs'
import { ClearingHouseSubmitter } from '../types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<ClearingHouseSubmitter>) => {
  return <SubmitterDialog data={record} />
}

export { RowActionEdit }
