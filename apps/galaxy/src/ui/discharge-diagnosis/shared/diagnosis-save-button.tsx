'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useStore as quicknoteStore } from '@/ui/quicknotes/store'
import { useStore } from '../store'

const DiagnosisSaveButton = () => {
  const saveWorkingDischargeDiagnosis = useStore(
    (state) => state.saveWorkingDischargeDiagnosis,
  )
  const setWidgetsData = quicknoteStore((state) => state.setWidgetsData)
  const patientId = useParams().id as string

  const handleSaveDiagnosis = () => {
    saveWorkingDischargeDiagnosis(patientId, setWidgetsData)
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
