'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { Appointment } from '@/types'
import { useStore as useDiagnosisStore } from '@/ui/diagnosis/store'
import { useStore } from './store'

const QuickNotesSaveButton = ({
  appointment,
}: {
  appointment: Appointment
}) => {
  const patientId = useParams().id as string
  const { saveWorkingDiagnosis } = useDiagnosisStore()
  const { save, loading, setWidgetsData } = useStore((state) => ({
    save: state.save,
    loading: state.loading,
    setWidgetsData: state.setWidgetsData,
  }))

  const saveWidgets = async () => {
    try {
      saveWorkingDiagnosis(patientId, setWidgetsData, false)
      await save(appointment)
    } catch (error) {
      console.error('Failed to save quick notes', error)
    }
  }

  return (
    <Button size="1" onClick={saveWidgets} disabled={loading} highContrast>
      <SaveIcon height={14} width={14} strokeWidth={2} />
      Save
    </Button>
  )
}

export { QuickNotesSaveButton }
