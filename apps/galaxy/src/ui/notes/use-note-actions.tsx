'use client'

import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useStore } from './store'
import { PatientNotes } from './types'

interface Payload {
  patientId: string
  appointmentId: string
  noteId: string
}
interface UseNoteActionsReturn {
  patientId: string
  note: PatientNotes | undefined
  validateAndPreparePayload: () => Payload | null
}

const useNoteActions = (): UseNoteActionsReturn => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))

  const validateAndPreparePayload = (): Payload | null => {
    if (!selectedRow) {
      toast.error('No note selected')
      return null
    }

    return {
      patientId: selectedRow.patientId,
      appointmentId: selectedRow.appointmentId,
      noteId: selectedRow.id,
    }
  }

  return {
    patientId: selectedRow?.patientId ?? '',
    note: selectedRow,
    validateAndPreparePayload,
  }
}

export { useNoteActions }
