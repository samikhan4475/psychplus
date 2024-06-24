import { unstable_noStore as noStore } from 'next/cache'
import { Problem } from '@psychplus/problems'
import { ProblemsDialogWidgetClient } from './problems-dialog-widget.client'

export interface ProblemFormDialogProps {
  isOpen?: boolean
  isEdit?: boolean
  closeDialog: () => void
  data?: Problem
}

const ProblemsDialogWidgetServer: React.FC<ProblemFormDialogProps> = async ({
  isOpen,
  isEdit = false,
  closeDialog,
  data,
}) => {
  noStore()

  return (
    <ProblemsDialogWidgetClient
      isOpen={isOpen}
      isEdit={isEdit}
      closeDialog={closeDialog}
      data={data}
    />
  )
}

export { ProblemsDialogWidgetServer }
