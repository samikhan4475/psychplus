'use client'

import { type PropsWithRow } from '@/components'
import { DeleteDialog } from '../dialogs/delete-dialog'
import { Staff } from '../types'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<Staff>) => {
  return <DeleteDialog staffId={record.id} />
}

export { RowActionDelete }
