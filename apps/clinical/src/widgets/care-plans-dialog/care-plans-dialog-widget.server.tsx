import { unstable_noStore as noStore } from 'next/cache'
import { CarePlan } from '@psychplus/care-plans'
import { CarePlansDialogWidgetClient } from './care-plans-dialog-widget.client'

export interface CarePlansFormDialogProps {
  isOpen?: boolean
  isEdit?: boolean
  closeDialog: () => void
  data?: CarePlan
}

const CarePlansDialogWidgetServer: React.FC<CarePlansFormDialogProps> = async ({
  isOpen,
  isEdit = false,
  closeDialog,
  data,
}) => {
  noStore()

  return (
    <CarePlansDialogWidgetClient
      isOpen={isOpen}
      isEdit={isEdit}
      closeDialog={closeDialog}
      data={data}
    />
  )
}

export { CarePlansDialogWidgetServer }
