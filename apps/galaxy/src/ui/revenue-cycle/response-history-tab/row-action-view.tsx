'use client'

import { type PropsWithRow } from '@/components'
import { ResponseHistoryDialog } from '../dialogs'
import { ResponseHistoryRecord } from '../types'

const RowActionView = ({
  row: { original: record },
}: PropsWithRow<ResponseHistoryRecord>) => {
  return <ResponseHistoryDialog data={record} />
}

export { RowActionView }
