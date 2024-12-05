'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useStore } from '@/ui/diagnosis/store'

const DiagnosisSaveButton = () => {
  const patientId = useParams().id as string
  const { saveWorkingDiagnosis } = useStore()

  const handleSaveDiagnosis = () => {
    saveWorkingDiagnosis(patientId)
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
