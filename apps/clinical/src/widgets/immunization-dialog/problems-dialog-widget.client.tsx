'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@radix-ui/themes'
import { Immunization } from '@psychplus/immunization'
import { ImmunizationTypeEnum } from '../immunization-list/types'
import { HistoricalForm } from './components/historical-form'
import { NewAdministeredForm } from './components/new-administered-form'
import { RefusalForm } from './components/refusal-form'

interface ImmunizationFormDialogProps {
  immunizationType: string | undefined
  isOpen: boolean
  isEdit?: boolean
  closeDialog: () => void
  data?: Immunization
}

const formTitle: Record<ImmunizationTypeEnum, string> = {
  [ImmunizationTypeEnum.Administered]: 'New Administered',
  [ImmunizationTypeEnum.Refusal]: 'Refusal',
  [ImmunizationTypeEnum.Historical]: 'Historical',
}

const ImmunizationDialogWidgetClient: React.FC<ImmunizationFormDialogProps> = ({
  immunizationType,
  isOpen,
  isEdit = false,
  closeDialog,
  data,
}) => {
  const lowerCasedImmunizationType =
    immunizationType?.toLowerCase() as ImmunizationTypeEnum

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && isOpen) {
          closeDialog()
        }
      }}
    >
      <Dialog.Trigger />
      <Dialog.Content className="relative max-w-[720px] rounded-6 p-12 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">
          {formTitle[lowerCasedImmunizationType]}
        </Dialog.Title>
        {lowerCasedImmunizationType === ImmunizationTypeEnum.Administered && (
          <NewAdministeredForm
            closeDialog={closeDialog}
            isEdit={isEdit}
            data={data}
          />
        )}
        {lowerCasedImmunizationType === ImmunizationTypeEnum.Historical && (
          <HistoricalForm
            isEdit={isEdit}
            data={data}
            closeDialog={closeDialog}
          />
        )}
        {lowerCasedImmunizationType === ImmunizationTypeEnum.Refusal && (
          <RefusalForm isEdit={isEdit} data={data} closeDialog={closeDialog} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ImmunizationDialogWidgetClient }
