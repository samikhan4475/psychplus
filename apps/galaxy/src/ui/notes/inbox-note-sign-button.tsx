import { useState } from 'react'
import { now } from '@internationalized/date'
import { Button } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { SignIcon } from '@/components/icons'
import { getSignInboxNoteAction } from './actions'
import { mapToUTCString } from './create-note/utils'
import { useStore } from './store'
import { Tabs } from './types'

const InboxNoteSignButton = ({ label }: { label: string }) => {
  const [loading, setLoading] = useState(false)
  const {
    setErrorMessage,
    setSelectedRow,
    setSelectedRows,
    setIsErrorAlertOpen,
    selectedRow,
    selectedRows,
    tab,
    fetchStaffNotes,
  } = useStore((state) => ({
    setErrorMessage: state.setErrorMessage,
    setIsErrorAlertOpen: state.setIsErrorAlertOpen,
    selectedRow: state.selectedRow,
    tab: state.tab,
    selectedRows: state.selectedRows,
    fetchStaffNotes: state.fetchStaffNotes,
    setSelectedRow: state.setSelectedRow,
    setSelectedRows: state.setSelectedRows,
  }))

  const handleClick = async () => {
    if (!selectedRow && selectedRows.length === 0) {
      setIsErrorAlertOpen(true)
      setErrorMessage('Please select a note to click this button')
      return
    }
    setLoading(true)
    const promises = []
    if (selectedRows.length > 0) {
      selectedRows.forEach((row) => {
        const currentTime = now(row?.locationTimeZone ?? '')
        const formattedDateTime = mapToUTCString(`${currentTime}`)
        promises.push(
          getSignInboxNoteAction({
            patientId: row.patientId,
            appointmentId: row.appointmentId,
            noteId: row.id,
            payload: { signDateTime: formattedDateTime },
          }),
        )
      })
    } else if (selectedRow) {
      const currentTime = now(selectedRow?.locationTimeZone ?? '')
      const formattedDateTime = mapToUTCString(`${currentTime}`)
      promises.push(
        getSignInboxNoteAction({
          patientId: selectedRow.patientId,
          appointmentId: selectedRow.appointmentId,
          noteId: selectedRow.id,
          payload: { signDateTime: formattedDateTime },
        }),
      )
    }
    const result = await Promise.all(promises)
    const statuses =
      tab === Tabs.PENDING_NOTES ? ['pending'] : ['SignedPending']

    if (result.every((r) => r.state === 'success')) {
      setLoading(false)
      toast.success('Signed')
      fetchStaffNotes({
        status: statuses,
      })
      setSelectedRow(undefined)
      setSelectedRows([])
    } else {
      setLoading(false)
      const errorMessage = result
        .filter((r) => r.state !== 'success')
        .map((r) => `Error signing note: ${r.error}`)
        .join(', ')
      toast.error(errorMessage || 'Error signing note')
    }
  }
  let isDisabled = false
  if ((!selectedRow && selectedRows.length === 0) || loading) {
    isDisabled = true
  }

  return (
    <>
      <Button size="1" highContrast onClick={handleClick} disabled={isDisabled}>
        <SignIcon width={16} height={16} />
        {label}
      </Button>
    </>
  )
}

export { InboxNoteSignButton }
