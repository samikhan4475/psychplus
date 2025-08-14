'use client'

import { useParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { useStore as quicknoteStore } from '@/ui/quicknotes/store'
import { useStore } from '../store'

const DiagnosisSaveButton = () => {
  const { saveWorkingDischargeDiagnosis, loadingWorkingDiagnosis } = useStore(
    (state) => ({
      saveWorkingDischargeDiagnosis: state.saveWorkingDischargeDiagnosis,
      loadingWorkingDiagnosis: state.loadingWorkingDiagnosis,
    }),
  )
  const setWidgetsData = quicknoteStore((state) => state.setWidgetsData)
  const { id: patientId, apptId = '' } = useParams<{
    id: string
    apptId: string
  }>()
  const handleSaveDiagnosis = () => {
    saveWorkingDischargeDiagnosis(patientId, apptId, setWidgetsData)
  }
  return (
    <Button
      onClick={handleSaveDiagnosis}
      type="submit"
      variant="outline"
      size="1"
      color="gray"
      className="text-black"
      disabled={loadingWorkingDiagnosis}
    >
      Save
    </Button>
  )
}

export { DiagnosisSaveButton }
