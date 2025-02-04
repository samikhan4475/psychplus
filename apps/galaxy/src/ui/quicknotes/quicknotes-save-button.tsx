'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { Appointment } from '@/types'
import { useStore as useDiagnosisStore } from '@/ui/diagnosis/store'
import { SAVE_BUTTON } from './constants'
import { useQuickNotesPermissions } from './hooks'
import { PermissionAlert } from './permission-alert'
import { useStore } from './store'

const QuickNotesSaveButton = ({
  appointment,
}: {
  appointment: Appointment
}) => {
  const patientId = useParams().id as string
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { canSaveButtonQuickNotePage } = useQuickNotesPermissions()
  const { saveWorkingDiagnosis } = useDiagnosisStore()
  const { save, loading, setWidgetsData } = useStore((state) => ({
    save: state.save,
    loading: state.loading,
    setWidgetsData: state.setWidgetsData,
  }))

  const saveWidgets = async () => {
    if (!canSaveButtonQuickNotePage) {
      setIsOpen(true)
      setAlertMessage(SAVE_BUTTON)
      return
    }
    try {
      saveWorkingDiagnosis(patientId, setWidgetsData, false)
      await save(appointment)
    } catch (error) {
      console.error('Failed to save quick notes', error)
    }
  }

  return (
    <>
      <PermissionAlert
        isOpen={isOpen}
        message={alertMessage}
        onClose={() => {
          setIsOpen(false)
          setAlertMessage('')
        }}
      />
      <Button size="1" onClick={saveWidgets} disabled={loading} highContrast>
        <SaveIcon height={14} width={14} strokeWidth={2} />
        Save
      </Button>
    </>
  )
}

export { QuickNotesSaveButton }
