'use client'

import { CheckboxCell, PropsWithRow } from '@/components'
import { useHasPermission } from '@/hooks'
import { useStore as useGlobalStore } from '@/store'
import { useStore } from '../store'
import { PatientVital } from '../types'

type AddToNoteCellProps = PropsWithRow<PatientVital>

const AddToNoteCell = ({ row }: AddToNoteCellProps) => {
  const checked = row.original.addToNote || false

  const {
    handleAddToNote,
    setIsErrorAlertOpen,
    setAlertErrorMessage,
    appointment,
  } = useStore((state) => ({
    handleAddToNote: state.handleAddToNoteCheck,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    setAlertErrorMessage: state.setAlertErrorMessage,
    appointment: state.appointment,
  }))

  const { staffId } = useGlobalStore((state) => state.user)
  const isAppointmentProviderLoggedIn = appointment?.providerStaffId === staffId
  const addToNoteProviderVitalsHistoryPermission = useHasPermission(
    'addToNoteProviderVitalsHistory',
  )

  const addToNote = (checked: boolean) => {
    if (
      !isAppointmentProviderLoggedIn ||
      !addToNoteProviderVitalsHistoryPermission
    ) {
      setIsErrorAlertOpen(true)
      setAlertErrorMessage(
        'You do not have permission to check/uncheck the Add to Note checkbox. Please contact your supervisor if you need any further assistance.',
      )

      return
    }

    handleAddToNote(row.original.id, checked)
  }

  return (
    <CheckboxCell
      label={checked ? 'Yes' : 'No'}
      checked={checked}
      className="ml-[-3px]"
      onCheckedChange={(checked) => addToNote(checked)}
      disabled={row.original.recordStatus !== 'Active'}
    />
  )
}

export { AddToNoteCell }
