'use client'

import { type PropsWithRow } from '@/components'
import { ReceiverDialog } from '../dialogs'
import { ClearingHouseReceiver } from '../types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<ClearingHouseReceiver>) => {
  return <ReceiverDialog data={record} />
}

export { RowActionEdit }
