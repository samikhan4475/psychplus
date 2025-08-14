'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@radix-ui/themes'
import { useStore } from '../store/store'
import { ImmunizationTypeEnum } from '../types'
import { AdministeredForm } from './forms/administered-form'
import { HistoricalForm } from './forms/historical-form'
import { RefusalForm } from './forms/refusal-form'

const formTitle: Record<ImmunizationTypeEnum, string> = {
  [ImmunizationTypeEnum.Administered]: 'New Administered',
  [ImmunizationTypeEnum.Refusal]: 'Refusal',
  [ImmunizationTypeEnum.Historical]: 'Historical',
}

const ImmunizationForm = () => {
  const { isDialogOpen, dialogType, editData, setDialogOpen } = useStore(
    ({ isDialogOpen, dialogType, editData, setDialogOpen }) => ({
      isDialogOpen,
      dialogType,
      editData,
      setDialogOpen,
    }),
  )

  const closeDialog = () => {
    setDialogOpen(false)
  }

  const lowerCasedImmunizationType = dialogType as ImmunizationTypeEnum

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && isDialogOpen) {
          closeDialog()
        }
      }}
    >
      <Dialog.Content className="relative w-full rounded-6 p-9 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="4">
          {formTitle[lowerCasedImmunizationType]}
        </Dialog.Title>
        {lowerCasedImmunizationType === ImmunizationTypeEnum.Administered && (
          <AdministeredForm closeDialog={closeDialog} data={editData} />
        )}
        {lowerCasedImmunizationType === ImmunizationTypeEnum.Historical && (
          <HistoricalForm data={editData} closeDialog={closeDialog} />
        )}
        {lowerCasedImmunizationType === ImmunizationTypeEnum.Refusal && (
          <RefusalForm data={editData} closeDialog={closeDialog} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ImmunizationForm }
