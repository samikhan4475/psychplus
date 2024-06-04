import { unstable_noStore as noStore } from 'next/cache'
import { FunctionalCognitive } from '@psychplus/functional-cognitive'
import { FunctionalCognitiveDialogWidgetClient } from './functional-cognitive-dialog-widget.client'

export interface ProblemFormDialogProps {
  isOpen?: boolean
  isEdit?: boolean
  closeDialog: () => void
  data?: FunctionalCognitive
}

const FunctionalCognitiveDialogWidgetServer: React.FC<
  ProblemFormDialogProps
> = async ({ isOpen, isEdit = false, closeDialog, data }) => {
  noStore()

  return (
    <FunctionalCognitiveDialogWidgetClient
      isOpen={isOpen}
      isEdit={isEdit}
      closeDialog={closeDialog}
      data={data}
    />
  )
}

export { FunctionalCognitiveDialogWidgetServer }
