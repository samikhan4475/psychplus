import React from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@radix-ui/themes'
import { NoShowHeader } from './blocks/ns-header'
import NoShowQuestionaire from './blocks/ns-questionaire'
import PatientInformationBlock from './blocks/patient-information-block'
import { NoShowPopUpParams } from './types'

function NoShowPopUp({
  appointment,
  isOpenDialog,
  setIsOpenDialog,
}: NoShowPopUpParams) {
  return (
    <Dialog.Root
      open={isOpenDialog}
      onOpenChange={(open) => setIsOpenDialog(!!open)}
    >
      <Dialog.Content className=" w-[700px] max-w-full">
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          No Show Confirmation
        </Dialog.Title>
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <NoShowHeader title={'Patient Information'}>
          <PatientInformationBlock appointment={appointment} />
        </NoShowHeader>
        <NoShowQuestionaire appointment={appointment} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default NoShowPopUp
