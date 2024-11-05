'use client'

import { Button } from '@radix-ui/themes'
import { useStore } from '../../store'

interface DiagnosisSaveButtonProps {
  patientId: string
}
const DiagnosisSaveButton = ({ patientId }: DiagnosisSaveButtonProps) => {
  const { saveWorkingDiagnosis } = useStore()

  const handleSaveDiagnosis =  () => {
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
