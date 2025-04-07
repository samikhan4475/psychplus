import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer, FormSubmitButton } from '@/components'
import {
  AddServiceBlock,
  AddTelestateBlock,
  AgeGroupBlock,
} from './form-blocks'
import {
  DaySelect,
  EndDateInput,
  EndTimeInput,
  PrimaryLocationSelect,
  PrimaryStateCosigner,
  PrimaryStateSelect,
  PublicViewSelect,
  RecurrenceSelect,
  StartDateInput,
  StartTimeInput,
  StatusSelect,
  VisitMediumSelect,
} from './form-fields'
import { schema, SchemaType } from './schema'

const ClinicScheduleForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<SchemaType>
}) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      services: [],
      groups: [],
      telestates: [],
    },
  })

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="gap-y-3">
      <Flex gap="3" align="start">
        <PrimaryStateSelect />
        <PrimaryLocationSelect />
        <PrimaryStateCosigner />
      </Flex>
      <Flex gap="3" align="start">
        <DaySelect />
        <RecurrenceSelect />
        <StartTimeInput />
        <EndTimeInput />
        <StartDateInput />
        <EndDateInput />
      </Flex>
      <Flex gap="3" align="start">
        <VisitMediumSelect />
        <StatusSelect />
        <PublicViewSelect />
      </Flex>
      <Flex gap="1">
        <AddServiceBlock />
        <AgeGroupBlock />
      </Flex>
      <AddTelestateBlock />
      <Flex justify="end">
        <FormSubmitButton form={form} highContrast>
          Save
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { ClinicScheduleForm }
