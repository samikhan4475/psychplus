'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import {
  AppointmentType,
  CODESETS,
  ProviderType,
} from '@psychplus-v2/constants'
import { CodesetCache } from '@psychplus-v2/types'
import { zipCodeSchema } from '@psychplus-v2/utils'
import { Button, Dialog, Flex, Heading, TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  CancelDialogButton,
  CloseDialogIcon,
  CodesetFormSelect,
  DialogTitle,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
} from '@/components-v2'
import { APPOINTMENTS_SEARCH_SESSION_KEY } from '@/features/appointments/search/constants'
import { CodesetStoreProvider } from '@/providers'
import { RadioGroupInput } from './radio-group-input'

const schema = z.object({
  providerType: z.custom<ProviderType>(),
  appointmentType: z.custom<AppointmentType>(),
  zipCode: zipCodeSchema.optional(),
  state: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

interface ScheduleAppointmentButtonProps
  extends React.ComponentProps<typeof Button> {
  codesets: CodesetCache
}

const ScheduleAppointmentButton = ({
  codesets,
  ...props
}: ScheduleAppointmentButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const router = useRouter()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      providerType: ProviderType.Psychiatrist,
      appointmentType: AppointmentType.Virtual,
      zipCode: '',
      state: '',
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
        <CodesetStoreProvider codesets={codesets}>
          <CloseDialogIcon />
          <DialogTitle className="font-serif">
            <Heading size="8">Schedule an appointment</Heading>
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
                title="Would you like to meet In-Person or Virtually?"
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
              <Flex justify="between" gap="2">
                <FormFieldContainer className="w-1/3">
                  <FormFieldLabel>Enter ZIP Code</FormFieldLabel>
                  <TextFieldInput
                    size="3"
                    radius="full"
                    {...form.register('zipCode')}
                    placeholder="Zip Code"
                  />
                  <FormFieldError name="zipCode" />
                </FormFieldContainer>

                <FormFieldContainer className="w-3/4">
                  <FormFieldLabel>State of Residence</FormFieldLabel>
                  <CodesetFormSelect
                    size="3"
                    name={'state'}
                    codeset={CODESETS.UsStates}
                  />
                  <FormFieldError name="state" />
                </FormFieldContainer>
              </Flex>
            </Flex>
            <Flex gap="3" justify="start" mt="7">
              <CancelDialogButton />
              <FormSubmitButton size="4" highContrast>
                Next
              </FormSubmitButton>
            </Flex>
          </FormContainer>
        </CodesetStoreProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScheduleAppointmentButton }
