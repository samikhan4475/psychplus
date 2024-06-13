import { unstable_noStore as noStore } from 'next/cache'
import { Immunization } from '@psychplus/immunization'
import { ImmunizationTypeEnum } from '../immunization-list/types'
import { ImmunizationDialogWidgetClient } from './problems-dialog-widget.client'

export interface ImmunizationFormDialogProps {
  isOpen: boolean
  isEdit?: boolean
  closeDialog: () => void
  data?: Immunization
  immunizationType: ImmunizationTypeEnum
}

const ImmunizationDialogWidgetServer: React.FC<
  ImmunizationFormDialogProps
> = async ({ isOpen, isEdit = false, closeDialog, data, immunizationType }) => {
  noStore()

  return (
    <ImmunizationDialogWidgetClient
      isOpen={isOpen}
      isEdit={isEdit}
      closeDialog={closeDialog}
      data={data}
      immunizationType={immunizationType}
    />
  )
}

export { ImmunizationDialogWidgetServer }
