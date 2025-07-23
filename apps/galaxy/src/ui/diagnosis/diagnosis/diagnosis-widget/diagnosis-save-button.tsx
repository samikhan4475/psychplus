'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { useStore } from '@/ui/diagnosis/store'
import { useStore as quicknoteStore } from '@/ui/quicknotes/store'

const DiagnosisSaveButton = () => {
  const patientId = useParams().id as string
  const { saveWorkingDiagnosis } = useStore()
  const setWidgetsData = quicknoteStore((state) => state.setWidgetsData)
  const handleSaveDiagnosis = () => {
    saveWorkingDiagnosis(patientId, setWidgetsData)
  }
  return (
    <Button
      onClick={handleSaveDiagnosis}
      type="submit"
      size="1"
      color="gray"
      highContrast
    >
      <SaveIcon width={15} height={15} strokeWidth={1.75} />
      Save
    </Button>
  )
}

export { DiagnosisSaveButton }
