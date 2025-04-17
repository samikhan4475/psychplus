'use client'

import { IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { DeleteIcon } from '@/components/icons'
import { disassociateUserAction } from './actions'
import { Users } from './types'

const RowActionDelete = ({
  row: { original: patient },
}: PropsWithRow<Users>) => {
  const disassociateUserStatus = async () => {
    if (!patient.practiceId) {
      return
    }
    const result = await disassociateUserAction(patient.id, patient?.practiceId)
    if (result.state === 'success') {
      toast.success('Successfully updated!')
    } else if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to update!')
    }
  }
  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      onClick={disassociateUserStatus}
      disabled={!patient.practiceId}
    >
      <DeleteIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDelete }
