import { PropsWithChildren } from 'react'
import { Dialog, Flex } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components'
import { ClinicScheduleForm } from './clinic-schedule-form'
import { SubmitHandler } from 'react-hook-form'
import { SchemaType } from './schema'

const AddClinicScheduleDialog = ({ children }: PropsWithChildren) => {
  const onSubmit: SubmitHandler<SchemaType> = () => {
    //TODO: Integrate add clinic schedule API
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className='min-w-[50%]'>
        <Flex justify='between'>
          <Dialog.Title>Add Clinic Schedule</Dialog.Title>
          <CloseDialogTrigger />
        </Flex>
        <ClinicScheduleForm onSubmit={onSubmit} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddClinicScheduleDialog }
