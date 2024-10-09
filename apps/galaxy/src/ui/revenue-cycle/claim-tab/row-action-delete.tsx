'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import type { Claim } from '@/types'
import { deleteClaim } from '../actions'
import { useStore } from './store'

const RowActionDelete = ({ row: { original: claim } }: PropsWithRow<Claim>) => {
  const claimsListSearch = useStore((state) => state.claimsListSearch)

  const deleteRecord = async () => {
    if (claim.id) {
      const result = await deleteClaim(claim.id)
      if (result.state == 'error') {
        toast.error(result.error ?? 'Failed to delete claim')
      } else if (result.state == 'success') {
        toast.success('Claim deleted successfully')
        claimsListSearch({})
      }
    }
  }

  return (
    <IconButton onClick={deleteRecord} size="1" color="gray" variant="ghost">
      <TrashIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDelete }
