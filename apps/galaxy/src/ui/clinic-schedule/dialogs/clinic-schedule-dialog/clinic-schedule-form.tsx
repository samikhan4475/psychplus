import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getLocations } from '@/actions/get-locations'
import { FormContainer, FormSubmitButton } from '@/components'
import { ClinicScheduleStatus } from '../../clinic-time-tab/constants'
import { useStore } from '../../clinic-time-tab/store'
import { AddTelestateBlock, AddVisitBlock, AgeGroupBlock } from './form-blocks'
import {
  BookingFrequencySelect,
  DaySelect,
  EndDateInput,
  EndTimeInput,
  GroupType,
  PrimaryLocationSelect,
  PrimaryStateCosigner,
  PrimaryStateSelect,
  PublicViewSelect,
  RecurrenceSelect,
  ServiceSelect,
  StartDateInput,
  StartTimeInput,
  StatusSelect,
  VisitMediumSelect,
} from './form-fields'
import { schema, SchemaType } from './schema'

interface ClinicScheduleFormProps {
  defaultValues?: Partial<SchemaType>
  providerId?: number
  onSubmit: SubmitHandler<SchemaType>
}

const ClinicScheduleForm = ({
  defaultValues,
  providerId,
  onSubmit,
}: ClinicScheduleFormProps) => {
  const { staff, fetchStates } = useStore((store) => ({
    fetchStates: store.fetchStates,
    staff: store.staff,
  }))
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: defaultValues ?? {
      groups: [],
      teleStates: [],
      visitTypes: [],
      status: ClinicScheduleStatus.Pending,
    },
  })
  const location = form.watch().primaryLocation
  const noVisitsSelected = form.formState.errors.visitTypes
  const noAgeGroupSelected = form.formState.errors.groups

  useEffect(() => {
    if (!staff) return
    fetchStates(providerId ?? Number(staff.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff, providerId])

  useEffect(() => {
    if (!location) return
    getLocations(location).then((res) => {
      if (res.state === 'error') return
      const address = res.data?.[0]?.address
      if (address?.timeZoneId) form.setValue('timeZoneId', address.timeZoneId)
    })
  }, [location])

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
      <Flex gap="3" align="start">
        <ServiceSelect />
        <GroupType />
        <BookingFrequencySelect />
      </Flex>
      <Flex gap="1">
        {/* <AddServiceBlock /> */}
        <Box className="w-full">
          <AddVisitBlock />
          {noVisitsSelected && (
            <Text size="1" color="tomato">
              {noVisitsSelected.message}
            </Text>
          )}
        </Box>
        <Box className="w-full">
          <AgeGroupBlock />
          {noAgeGroupSelected && (
            <Text size="1" color="tomato">
              {noAgeGroupSelected.message}
            </Text>
          )}
        </Box>
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
