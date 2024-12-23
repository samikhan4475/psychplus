'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useStore } from '@/ui/diagnosis/store'

const DiagnosisSaveButton = () => {
  const patientId = useParams().id as string
  const { saveWorkingDiagnosis } = useStore()
  const router = useRouter()

  const handleSaveDiagnosis = () => {
    saveWorkingDiagnosis(patientId)
    router.refresh()
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
