'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { revalidateAction } from '@/actions/revalidate'
import { saveWidgetAction } from '@/actions/save-widget'
import { genericEventBus } from '@/lib/generic-event-bus'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { transformIn, transformOut } from '../../data'
import { useStore } from './store'

const AddToNoteButton = ({
  sectionName,
}: {
  sectionName: QuickNoteSectionName
}) => {
  const [addToNoteLoading, setAddToNoteLoading] = useState(false)
  const patientId = useParams().id as string
  const { updateWidgetsData, updateActualNoteWidgetsData, isQuickNoteView } =
    useQuickNoteUpdate()
  const { selectedRow, loading, fetchLabAndOrdersHistories } = useStore(
    (state) => ({
      selectedRow: state.selectedRow,
      loading: state.loading,
      fetchLabAndOrdersHistories: state.fetchLabAndOrdersHistories,
    }),
  )

  const handleSave = async () => {
    if (!selectedRow) {
      toast.error('No row selected!')
      return
    }

    setAddToNoteLoading(true)

    const data = transformOut(patientId)(transformIn(selectedRow?.data ?? []))

    const result = await saveWidgetAction({
      patientId: patientId.toString(),
      data: data,
    })

    if (result.state === 'error') {
      toast.error('Failed to save!')

      return
    }

    toast.success('Saved!')

    updateWidgetsData(data)
    updateActualNoteWidgetsData(data)
    if (!isQuickNoteView) revalidateAction()

    genericEventBus.emit('lab-and-orders-updated-tab', { patientId })
    setAddToNoteLoading(false)
    fetchLabAndOrdersHistories(patientId, sectionName)
  }

  return (
    <Button
      size="1"
      highContrast
      className="cursor-pointer px-3 py-1.5"
      onClick={(e) => {
        e.preventDefault()
        handleSave()
      }}
      disabled={addToNoteLoading || loading}
    >
      <CopyIcon width={16} height={16} />
      Add to Note
    </Button>
  )
}

export { AddToNoteButton }
