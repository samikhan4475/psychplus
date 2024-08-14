import { unstable_noStore as noStore } from 'next/cache'
import { ProcedureFormDialogProps } from '@psychplus/procedures'
import { ProceduresDialogWidgetClient } from './procedures-dialog-widget.client'

const ProceduresDialogWidgetServer = ({
  isOpen,
  isEdit = false,
  closeDialog,
  data,
}: ProcedureFormDialogProps) => {
  noStore()

  return (
    <ProceduresDialogWidgetClient
      isOpen={isOpen}
      isEdit={isEdit}
      closeDialog={closeDialog}
      data={data}
    />
  )
}

export { ProceduresDialogWidgetServer }
