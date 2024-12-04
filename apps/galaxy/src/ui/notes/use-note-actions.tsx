'use client'

import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useStore } from './store'

interface UseNoteActionsReturn {
  patientId: string
  note: any
  validateAndPreparePayload: (
    additionalFields?: Record<string, any>,
  ) => any | null
}

const useNoteActions = (): UseNoteActionsReturn => {
  const patientId = useParams().id as string
  const { data, selectedRow } = useStore((state) => ({
    data: state.data,
    selectedRow: state.selectedRow,
  }))

  const note = data?.notes[Number(selectedRow)]

  const validateAndPreparePayload = (additionalFields = {}) => {
    if (!note) {
      toast.error('No note selected')
      return null
    }

    if (!patientId) {
      toast.error('Patient ID is missing')
      return null
    }

    const payload = {
      patientId,
      appointmentId: note.appointmentId,
      noteId: note.id,
      ...additionalFields,
    }
    return {
      payload,
    }
  }

  return {
    patientId,
    note,
    validateAndPreparePayload,
  }
}

export { useNoteActions }
