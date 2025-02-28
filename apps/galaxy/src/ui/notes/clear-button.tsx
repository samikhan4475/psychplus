'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { type NotesFilterSchemaType } from './left-panel-filters'
import { useStore } from './store'
import { Tabs } from './types'

const ClearButton = ({
  patientId,
  disabled = false,
}: {
  patientId?: string
  disabled?: boolean
}) => {
  const form = useFormContext<NotesFilterSchemaType>()

  const {
    fetch,
    fetchStaffNotes,
    isInboxNotes,
    tab,
    setSelectedRows,
    setSelectedRow,
  } = useStore((state) => ({
    fetch: state.fetch,
    fetchStaffNotes: state.fetchStaffNotes,
    isInboxNotes: state.isInboxNotes,
    tab: state.tab,
    setSelectedRows: state.setSelectedRows,
    setSelectedRow: state.setSelectedRow,
  }))

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setSelectedRows([])
    setSelectedRow(undefined)
    form.reset()
    const statuses =
      tab === Tabs.PENDING_NOTES ? ['pending'] : ['SignedPending']
    if (isInboxNotes) {
      return fetchStaffNotes({
        status: statuses,
      })
    }

    return fetch({
      patientId,
    })
  }

  return (
    <Button
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="button"
      onClick={onClear}
      disabled={disabled}
    >
      Clear
    </Button>
  )
}

export { ClearButton }
