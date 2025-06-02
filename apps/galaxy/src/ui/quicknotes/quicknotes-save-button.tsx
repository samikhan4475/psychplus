'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { revalidateAction } from '@/actions/revalidate'
import { VisitTypeEnum } from '@/enum'
import { genericEventBus } from '@/lib/generic-event-bus'
import { Appointment } from '@/types'
import { SAVE_BUTTON } from './constants'
import { useQuickNotesPermissions } from './hooks'
import { PermissionAlert } from './permission-alert'
import { useStore } from './store'

const QuickNotesSaveButton = ({
  appointment,
}: {
  appointment: Appointment
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { canSaveButtonQuickNotePage } = useQuickNotesPermissions()
  const { save, loading } = useStore((state) => ({
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
      await save(appointment)
      if (appointment.visitTypeCode === VisitTypeEnum.UDS) {
        genericEventBus.emit(`${appointment.id}`, {
          type: 'lab-order',
          message: 'Lab order saved',
          timestamp: new Date().toISOString(),
        })
      }
      revalidateAction(false)
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
