import { unstable_noStore as noStore } from 'next/cache'
import { FunctionalCognitive } from '@psychplus/functional-cognitive'
import { AssessmentAndTreatmentPlanDialogWidgetClient } from './assessment-and-treatment-plan-dialog-widget.client'

export interface ProblemFormDialogProps {
  isOpen?: boolean
  isEdit?: boolean
  closeDialog: () => void
  data?: FunctionalCognitive
}

const AssessmentAndTreatmentPlanDialogWidgetServer = ({
  isOpen,
  isEdit = false,
  closeDialog,
  data,
}: ProblemFormDialogProps) => {
  noStore()

  return (
    <AssessmentAndTreatmentPlanDialogWidgetClient
      isOpen={isOpen}
      isEdit={isEdit}
      closeDialog={closeDialog}
      data={data}
    />
  )
}

export { AssessmentAndTreatmentPlanDialogWidgetServer }
