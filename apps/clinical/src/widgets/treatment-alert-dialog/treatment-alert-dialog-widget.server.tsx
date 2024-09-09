import { unstable_noStore as noStore } from 'next/cache'
import { TreatmentAlertDialogWidgetClient } from './treatment-alert-dialog-widget.client'
import { alertType, TreatmentAlertDialogDialogProps } from './types'

const TreatmentAlertDialogWidgetServer = ({
  isOpen,
  closeDialog,
  data,
}: TreatmentAlertDialogDialogProps) => {
  noStore()

  return (
    <TreatmentAlertDialogWidgetClient
      isOpen={isOpen}
      closeDialog={closeDialog}
      data={data}
      type={alertType.Billing}
    />
  )
}

export { TreatmentAlertDialogWidgetServer }
