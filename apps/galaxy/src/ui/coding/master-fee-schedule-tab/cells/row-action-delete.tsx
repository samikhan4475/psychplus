'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { deleteMasterFeeScheduleAction } from '../../actions'
import { CPT } from '../../types'
import { useStore } from '../store'

const RowActionDelete = ({ row: { original: cpt } }: PropsWithRow<CPT>) => {
  const search = useStore((state) => state.search)
  const deleteRecord = async () => {
    const result = await deleteMasterFeeScheduleAction(cpt.id)
    if (result.state === 'success') {
      toast.success('cpt record deleted successfully')
      search()
    } else if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to delete cpt record')
    }
  }

  return (
    <IconButton onClick={deleteRecord} size="1" color="gray" variant="ghost">
      <TrashIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDelete }
