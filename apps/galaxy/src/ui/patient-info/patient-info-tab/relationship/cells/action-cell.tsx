'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { Relationship } from '@/types'
import { deletePatientRelationshipAction } from '../../actions'
import { usePatientRelationshipContext } from '../context'

const ActionsCell = ({
  row: {
    original: { id, patientId },
  },
}: PropsWithRow<Relationship>) => {
  const [disabled, setDisabled] = useState(false)
  const { setRelationships, setLoading } = usePatientRelationshipContext()
  const onDeleteRelation = async () => {
    setDisabled(true)
    const result = await deletePatientRelationshipAction(String(patientId), id)
    setLoading(true)
    if (result.state === 'error') {
      toast.error(result.error as string)
    } else {
      setRelationships((relationships) =>
        relationships.filter((relation) => relation.id !== id),
      )
      toast.success('Relationship deleted')
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
    setDisabled(false)
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
