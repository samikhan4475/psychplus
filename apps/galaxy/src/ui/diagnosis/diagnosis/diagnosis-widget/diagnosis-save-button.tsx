'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
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
      variant="outline"
      size="1"
      color="gray"
      className="text-black"
    >
      Save
    </Button>
  )
}

export { DiagnosisSaveButton }
