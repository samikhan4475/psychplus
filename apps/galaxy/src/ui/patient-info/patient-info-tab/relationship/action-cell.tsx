'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/types'
import { deletePatientRelationshipAction } from '../actions'

const ActionsCell = ({
  row: {
    original: { id, patientId },
  },
}: PropsWithRow<Relationship>) => {
  const [disabled, setDisabled] = useState(false)
  const router = useRouter()

  const onDeleteRelation = async () => {
    setDisabled(true)
    const result = await deletePatientRelationshipAction(String(patientId), id)
    if (result.state === 'error') {
      return toast.error(result.error as string)
    }

    toast.success('Relationship deleted')
    setDisabled(false)
    router.refresh()
  }
  return (
    <IconButton
      size="1"
      variant="ghost"
      color="gray"
      disabled={disabled}
      onClick={onDeleteRelation}
    >
      <Trash2 width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}
export { ActionsCell }
