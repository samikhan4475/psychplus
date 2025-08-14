'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useStore } from '@/ui/diagnosis/store'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { useStore as quicknoteStore } from '@/ui/quicknotes/store'
import { refetchReferrals } from '@/ui/quicknotes/utils'

const DiagnosisSaveButton = () => {
  const patientId = useParams().id as string
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id') ?? undefined
  const { saveWorkingDiagnosis, loadingWorkingDiagnosis } = useStore()
  const setWidgetsData = quicknoteStore((state) => state.setWidgetsData)
  const handleSaveDiagnosis = () => {
    saveWorkingDiagnosis(patientId, setWidgetsData, true, appointmentId)
    refetchReferrals()
  }
  const { isQuickNoteView } = useQuickNoteUpdate()

  if (isQuickNoteView) {
    return (
      <Button
        onClick={handleSaveDiagnosis}
        variant="outline"
        type="submit"
        size="1"
        color="gray"
        className="text-black"
        disabled={loadingWorkingDiagnosis}
      >
        Save
      </Button>
    )
  }

  return (
    <Button
      onClick={handleSaveDiagnosis}
      type="submit"
      size="1"
      color="gray"
      highContrast
      disabled={loadingWorkingDiagnosis}
    >
      <SaveIcon width={15} height={15} strokeWidth={1.75} />
      Save
    </Button>
  )
}

export { DiagnosisSaveButton }
