'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { AppointmentType, ProviderType } from '@psychplus-v2/constants'
import { Button, Dialog, Flex, Heading } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  CancelDialogButton,
  CloseDialogIcon,
  DialogTitle,
  FormSubmitButton,
} from '@/components-v2'
import { APPOINTMENTS_SEARCH_SESSION_KEY } from '@/features/appointments/search/constants'
import { RadioGroupInput } from './radio-group-input'

const schema = z.object({
  providerType: z.custom<ProviderType>(),
  appointmentType: z.custom<AppointmentType>(),
})

type SchemaType = z.infer<typeof schema>

type ScheduleAppointmentButtonProps = React.ComponentProps<typeof Button>

const ScheduleAppointmentButton = (props: ScheduleAppointmentButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const router = useRouter()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      providerType: ProviderType.Psychiatrist,
      appointmentType: AppointmentType.Virtual,
    },
  })

  const onSubmit = (data: SchemaType) => {
    sessionStorage.setItem(
      APPOINTMENTS_SEARCH_SESSION_KEY,
      JSON.stringify({ state: data }),
    )

    router.push(`/appointments/search`)

    setDialogOpen(false)
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger>
        <Flex className={props.className}>
          <Button size="3" highContrast {...props}>
            Schedule Visit
          </Button>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content className="relative pt-10">
        <CloseDialogIcon />
        <DialogTitle className="font-serif">
          <Heading size="8">Schedule a Visit</Heading>
        </DialogTitle>
        <FormContainer form={form} onSubmit={onSubmit}>
          <Flex direction="column" gap="5">
            <RadioGroupInput
              title="Do you want to see a Psychiatrist or a Therapist?"
              options={[
                {
                  value: ProviderType.Psychiatrist.toString(),
                  label: 'Psychiatrist',
                  description: 'Diagnosis / Medications',
                },
                {
                  value: ProviderType.Therapist.toString(),
                  label: 'Therapist',
                  description: 'Counseling',
                },
              ]}
              value={form.watch('providerType').toString()}
              onChange={(value) => {
                form.setValue('providerType', Number(value))
              }}
            />
            <RadioGroupInput
              title="Would you like to meet in-person or virtually?"
              options={[
                {
                  value: AppointmentType.Virtual,
                  label: 'Virtual',
                },
                {
                  value: AppointmentType.InPerson,
                  label: 'In-Person',
                },
              ]}
              value={form.watch('appointmentType')}
              onChange={(value) => {
                form.setValue('appointmentType', value as AppointmentType)
              }}
            />
          </Flex>
          <Flex gap="3" justify="end" mt="7">
            <CancelDialogButton />
            <FormSubmitButton size="4" highContrast>
              Continue
            </FormSubmitButton>
          </Flex>
        </FormContainer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScheduleAppointmentButton }
