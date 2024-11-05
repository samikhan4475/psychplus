'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { deleteSubmitterRecord } from '../actions'
import { ClearingHouseSubmitter } from '../types'
import { useStore } from './store'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<ClearingHouseSubmitter>) => {
  const search = useStore((state) => state.search)

  const deleteRecord = async () => {
    if (record.id) {
      const result = await deleteSubmitterRecord(record.id)
      if (result.state === 'error') {
        return toast.error(result.error ?? 'Failed to delete submitter record')
      }
      toast.success('Submitter record deleted successfully')
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
