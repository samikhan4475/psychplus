'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { ClearingHouseReceiver } from '@/types'
import { deleteReceiverRecord } from '../actions'
import { useStore } from './store'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<ClearingHouseReceiver>) => {
  const search = useStore((state) => state.search)

  const deleteRecord = async () => {
    const result = await deleteReceiverRecord(record.id)
    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to delete receiver record')
    } else if (result.state === 'success') {
      toast.success('Receiver record deleted successfully')
      search({})
    }
  }

  return (
    <IconButton onClick={deleteRecord} size="1" color="gray" variant="ghost">
      <TrashIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDelete }
