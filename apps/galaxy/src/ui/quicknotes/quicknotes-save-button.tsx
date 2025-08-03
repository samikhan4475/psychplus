'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { ClipboardIcon, SaveIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { revalidateAction } from '@/actions/revalidate'
import { VisitTypeEnum } from '@/enum'
import { genericEventBus } from '@/lib/generic-event-bus'
import { Appointment } from '@/types'
import { useHpiWidget } from '../hpi/hooks'
import { useHpiHistoryStore } from '../hpi/hpi-history-dialog/store'
import { SAVE_BUTTON } from './constants'
import { useQuickNotesPermissions } from './hooks'
import { PermissionAlert } from './permission-alert'
import { useStore } from './store'

const QuickNotesSaveButton = ({
  appointment,
  isAddToNotes = false,
  patientId = '',
  disabled = false,
}: {
  appointment: Appointment
  isAddToNotes?: boolean
  patientId?: string
  disabled?: boolean
}) => {
  const { fetchHistory } = useHpiHistoryStore()
  const { getFormattedValues } = useHpiWidget()
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
      save(
        appointment,
        isAddToNotes,
        isAddToNotes ? getFormattedValues : () => [],
      )
      if (appointment.visitTypeCode === VisitTypeEnum.UDS) {
        genericEventBus.emit(`${appointment.id}`, {
          type: 'lab-order',
          message: 'Lab order saved',
          timestamp: new Date().toISOString(),
        })
      }
      fetchHistory({ patientId })
      revalidateAction(false, isAddToNotes)
    } catch (error) {
      console.error(error)
      toast.error('Failed to save quick notes')
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
      <Button
        size="1"
        onClick={saveWidgets}
        disabled={loading || disabled}
        highContrast
      >
        {isAddToNotes ? (
          <>
            <ClipboardIcon height={14} width={14} strokeWidth={2} />
            Add to Notes
          </>
        ) : (
          <>
            <SaveIcon height={14} width={14} strokeWidth={2} />
            Save
          </>
        )}
      </Button>
    </>
  )
}

export { QuickNotesSaveButton }
