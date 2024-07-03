import { unstable_noStore as noStore } from 'next/cache'
import { PatientPlanOfTreatment } from '@psychplus/assessment-and-treatment-plan/types'
import { TreatmentPlanDialogWidgetClient } from './treatment-plan-dialog-widget.client'

interface traeatmentPlanFormDialogProps {
  isOpen?: boolean
  isEdit?: boolean
  closeDialog: () => void
  data?: PatientPlanOfTreatment
}

const TreatmentPlanDialogWidgetServer = ({
  isOpen,
  isEdit = false,
  closeDialog,
  data,
}: traeatmentPlanFormDialogProps) => {
  noStore()

  return (
    <TreatmentPlanDialogWidgetClient
      isOpen={isOpen}
      isEdit={isEdit}
      closeDialog={closeDialog}
      data={data}
      rowId={data?.patientAssessmentPlanId}
    />
  )
}

export { TreatmentPlanDialogWidgetServer }
