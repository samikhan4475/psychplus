'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@radix-ui/themes'
import { PatientPlanOfTreatment } from '@psychplus/assessment-and-treatment-plan/types'
import { TreatementPlanForm } from './components'

interface traeatmentPlanFormDialogProps {
  isOpen?: boolean
  isEdit?: boolean
  closeDialog: () => void
  data?: PatientPlanOfTreatment
  rowId?: string
}

const TreatmentPlanDialogWidgetClient: React.FC<
  traeatmentPlanFormDialogProps
> = ({ isOpen, isEdit = false, closeDialog, data, rowId = undefined }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeDialog}>
      <Dialog.Content className="relative max-w-[720px] rounded-6 p-12 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">
          {isEdit ? 'Edit' : 'Add'} Treatement of plan
        </Dialog.Title>
        <TreatementPlanForm
          isEdit={isEdit}
          closeDialog={closeDialog}
          data={data}
          rowId={rowId}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { TreatmentPlanDialogWidgetClient }
