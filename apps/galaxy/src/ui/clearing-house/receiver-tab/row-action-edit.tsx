'use client'

import { type PropsWithRow } from '@/components'
import { ClearingHouseReceiver } from '@/types'
import { ReceiverDialog } from '../dialogs'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<ClearingHouseReceiver>) => {
  return <ReceiverDialog data={record} />
}

export { RowActionEdit }
