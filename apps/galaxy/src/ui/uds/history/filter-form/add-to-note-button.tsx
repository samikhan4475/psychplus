'use client'

import { useMemo } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { saveWidgetAction } from '@/actions/save-widget'
import { genericEventBus } from '@/lib/generic-event-bus'
import { shouldDisableDiagnosisActions } from '@/ui/diagnosis/diagnosis/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { useStore as useQuickNoteStore } from '@/ui/quicknotes/store'
import { useStore } from '../store'
import { createUdsPayload } from './utils'

const AddButton = () => {
  const { setDialogOpen } = useStore()
  const diagnosisData = useQuickNoteStore(
    (state) =>
      state.actualNotewidgetsData[
        QuickNoteSectionName.QuickNoteSectionDiagnosis
      ],
  )

  const searchParams = useSearchParams()
  const visitType = searchParams.get('visitType') ?? ''
  const visitSequence = searchParams.get('visitSequence') ?? ''
  const appointmentId = searchParams.get('id')

  const isHospitalDischargeView = useMemo(
    () => shouldDisableDiagnosisActions(visitType, visitSequence),
    [visitType, visitSequence],
  )

  const { updateWidgetsData, updateActualNoteWidgetsData } =
    useQuickNoteUpdate()
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))

  const patientId = useParams().id as string

  const handleSave = async () => {
    if (!selectedRow) {
      toast.error('No row selected!')
      return
    }

    const payload = await createUdsPayload({
      patientId,
      appointmentId,
      data: selectedRow.data,
      diagnosisData,
      isHospitalDischargeView,
    })

    const result = await saveWidgetAction({
      patientId: patientId.toString(),
      appointmentId:appointmentId?.toString(),
      data: payload,
    })

    if (result.state === 'error') {
      toast.error('Failed to save!')

      return
    }

    toast.success('Saved!')

    updateWidgetsData(payload)
    updateActualNoteWidgetsData(payload)

    genericEventBus.emit(`${appointmentId}`, {
      type: 'lab-order',
      message: 'Lab order updated',
      timestamp: new Date().toISOString(),
    })
    genericEventBus.emit('uds-updated-tab', { patientId })
    setDialogOpen(false)
  }

  return (
    <Button
      size="1"
      color="gray"
      className="bg-pp-black-1 text-white cursor-pointer px-3 py-1.5"
      onClick={(e) => {
        e.preventDefault()
        handleSave()
      }}
    >
      <CopyIcon width={16} height={16} />
      Add to Note
    </Button>
  )
}

export { AddButton }
