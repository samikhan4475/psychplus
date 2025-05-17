'use client'

import { useParams } from 'next/navigation'
import { Row } from '@tanstack/react-table'
import { Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { deleteAllergy } from '../actions'
import { useStore } from '../store'
import { AllergyDataResponse } from '../types'
import { ActionItem } from './action-item'

interface RowActionDeleteProps {
  row: Row<AllergyDataResponse>
}
const RowActionDelete = ({ row }: RowActionDeleteProps) => {
  const { id } = useParams<{ id: string }>()
  const { allergiesListSearch } = useStore()

  const handleDelete = async () => {
    const response = await deleteAllergy(
      row.original.patientId,
      row.original.id,
    )
    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    toast.success('Allergy Deleted Successfully')
    allergiesListSearch(id)
  }

  return <ActionItem Icon={Trash2Icon} onClick={handleDelete} />
}

export { RowActionDelete }
