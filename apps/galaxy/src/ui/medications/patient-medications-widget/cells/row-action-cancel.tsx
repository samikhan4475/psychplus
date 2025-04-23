'use client'

import { useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { IconButton, Tooltip } from '@radix-ui/themes'
import { CircleX } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { cancelPatientPrescriptions } from '../actions'
import { useStore } from '../store'
import { PatientMedication } from '../types'

const RowActionCancel = ({ row }: PropsWithRow<PatientMedication>) => {
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
  }))
  const { id } = row.original
  const patientId = useParams().id as string
  const pathname = usePathname()
  const isQuickNoteSection = pathname.includes('quicknotes')
  const [isLoading, setIsLoading] = useState(false)
  const onCancel = async () => {
    setIsLoading(true)
    const result = await cancelPatientPrescriptions(Number(patientId), id)
    if (result.state === 'success') {
      toast.success('Prescription cancelled successfully.')
      refetch(isQuickNoteSection)
    } else if (result.state === 'error') {
      toast.error('Unable to cancel prescription.')
    }
    setIsLoading(false)
  }

  return (
    <Tooltip content="Cancel">
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        onClick={onCancel}
        disabled={isLoading}
      >
        <CircleX size={18} color="black" />
      </IconButton>
    </Tooltip>
  )
}

export { RowActionCancel }
