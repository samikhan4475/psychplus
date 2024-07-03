'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@radix-ui/themes'
import { ProblemFormDialogProps } from '.'
import { AssessmentAndTreatmentPlanForm } from './components'

const AssessmentAndTreatmentPlanDialogWidgetClient: React.FC<
  ProblemFormDialogProps
> = ({ isOpen, closeDialog }) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && isOpen) {
          closeDialog()
        }
      }}
    >
      <Dialog.Content className="relative max-w-[720px] rounded-6 p-12 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <AssessmentAndTreatmentPlanForm closeDialog={closeDialog} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AssessmentAndTreatmentPlanDialogWidgetClient }
