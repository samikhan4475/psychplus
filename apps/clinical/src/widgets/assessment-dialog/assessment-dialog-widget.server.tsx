import { unstable_noStore as noStore } from 'next/cache'
import { PatientAssessment } from '@psychplus/assessment-and-treatment-plan/types'
import { AssessmentDialogWidgetClient } from './assessment-dialog-widget.client'

export interface AssessmentFormDialogProps {
  isOpen?: boolean
  isEdit?: boolean
  closeDialog: () => void
  data?: PatientAssessment
}

const AssessmentDialogWidgetServer = ({
  isOpen,
  isEdit = false,
  closeDialog,
  data,
}: AssessmentFormDialogProps) => {
  noStore()

  return (
    <AssessmentDialogWidgetClient
      isOpen={isOpen}
      isEdit={isEdit}
      closeDialog={closeDialog}
      data={data}
    />
  )
}

export { AssessmentDialogWidgetServer }
