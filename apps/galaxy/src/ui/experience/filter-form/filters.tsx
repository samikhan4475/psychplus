'use client'

import { useEffect, useState } from 'react'
import { CalendarDate } from '@internationalized/date'
import { Flex, Grid } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  CodesetSelect,
  DatePickerInput,
  DropdownSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  MultiSelectField,
  NumericInput,
  SelectInput,
  TextInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { SelectOptionType } from '@/types'
import { LocationsSelect } from '@/ui/billing-history/locations-select'
import { ExperienceSchemaType } from '@/ui/experience/filter-form/schema'
import { getInsurancePlanOptionsAction } from '../actions'

const Filters = () => {
  const { watch, setValue } = useFormContext<ExperienceSchemaType>()
  const isToDateDisabled = watch('fromDateTime')
  const genderOptions = useCodesetOptions(CODESETS.Gender)
  const [insurancePayers, setInsurancePayers] = useState<SelectOptionType[]>([])

  useEffect(() => {
    getInsurancePlanOptionsAction().then((response) => {
      if (response.state === 'error') {
        toast.error(
          response.error ? response.error : 'Failed to fetch insurance options',
        )
        return setInsurancePayers([])
      }
      setInsurancePayers(response.data)
    })
  }, [])

  const ratings = Array.from({ length: 5 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
    disabled: false,
  }))

  return (
    <Grid className="col-span-full" gap="2">
      <Flex className="col-span-full items-end" gap="3">
        <FormFieldContainer className="min-w-0 flex-row gap-1">
          <FormFieldLabel className="!text-1">From</FormFieldLabel>
          <DatePickerInput
            className="w-[140px]"
            field="fromDateTime"
            maxValue={watch('toDateTime') ?? undefined}
            dateInputClass="h-6"
            minValue={new CalendarDate(2000, 1, 1)}
          />
        </FormFieldContainer>

        <FormFieldContainer className="flex-1 flex-row gap-1">
          <FormFieldLabel className="!text-1">To</FormFieldLabel>
          <DatePickerInput
            className="w-[120px]"
            field="toDateTime"
            isDisabled={!isToDateDisabled}
            minValue={watch('fromDateTime') ?? undefined}
            dateInputClass="h-6"
          />
        </FormFieldContainer>

        <FormFieldContainer className="min-w-0 flex-row gap-1">
          <FormFieldLabel className="!text-1">First Name</FormFieldLabel>
          <TextInput
            field="patientFirstName"
            placeHolder="First Name"
            className="h-6 w-full max-w-[140px]"
          />
        </FormFieldContainer>

        <FormFieldContainer className="min-w-0 flex-row gap-1">
          <FormFieldLabel className="!text-1">Last Name</FormFieldLabel>
          <TextInput
            field="patientLastName"
            placeHolder="Last Name"
            className="h-6 w-full max-w-[140px]"
          />
        </FormFieldContainer>

        <FormFieldContainer className="min-w-0 flex-row gap-1">
          <FormFieldLabel className="!text-1">Age</FormFieldLabel>
          <NumericInput
            field="age"
            allowNegative={false}
            prefix=""
            placeholder="Age"
            maxLimit={1000}
            decimalScale={0}
            containerClassName="w-[140px]"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
          />
          <FormFieldError name="age" />
        </FormFieldContainer>

        <FormFieldContainer className="min-w-0 flex-row gap-1">
          <FormFieldLabel className="!text-1">Gender</FormFieldLabel>
          <DropdownSelect
            field="gender"
            options={genderOptions}
            className="h-6 w-[140px]"
          />
        </FormFieldContainer>

        <FormFieldContainer className="min-w-0 flex-row gap-1">
          <FormFieldLabel className="!text-1">DOB</FormFieldLabel>
          <DatePickerInput
            className="w-[140px]"
            field="dateOfBirth"
            yearFormat="YYYY"
            dateInputClass="h-6"
          />
        </FormFieldContainer>

        <LocationsSelect />

        <FormFieldContainer className="flex-row items-center gap-1">
          <FormFieldLabel>Visit Type</FormFieldLabel>
          <CodesetSelect
            name="visitType"
            codeset={CODESETS.VisitType}
            className="border-pp-gray-2 h-6 w-[150px] border border-solid !outline-none [box-shadow:none]"
            size="1"
            placeholder="Select visit type"
          />
        </FormFieldContainer>
      </Flex>

      <Flex className="col-span-full items-end" gap="3">
        <FormFieldContainer className="flex-row items-center gap-1">
          <FormFieldLabel className="!text-1">
            Primary/Sec. Insurance
          </FormFieldLabel>

          <MultiSelectField
            defaultValues={watch('payerPlanIds')}
            options={insurancePayers}
            className="w-[140px] flex-1"
            onChange={(values) => {
              setValue('payerPlanIds', values, {
                shouldDirty: true,
              })
            }}
            menuClassName="w-[155px]"
          />

          <FormFieldError name="payerPlanIds" />
        </FormFieldContainer>
        <FormFieldContainer className={'flex-row items-center gap-1'}>
          <FormFieldLabel className={'shrink-0'}>Rating</FormFieldLabel>
          <SelectInput
            field="rating"
            className={'min-w-0 flex-1'}
            buttonClassName={
              'w-full min-w-0 h-6 border border-solid border-pp-gray-2 !outline-none [box-shadow:none] w-[140px]'
            }
            options={ratings}
          />
          <FormFieldError name="rating" />
        </FormFieldContainer>
        <FormFieldContainer className={'flex-row items-center gap-1'}>
          <FormFieldLabel className={'shrink-0 !text-1'}>Reason</FormFieldLabel>
          <Flex className={'min-w-0 flex-1'}>
            <CodesetSelect
              name="appointmentRatingReason"
              codeset={CODESETS.AppointmentRatingReason}
              className="border-pp-gray-2 h-7 w-[140px] min-w-0 border border-solid text-1 !outline-none [box-shadow:none]"
              size="1"
              placeholder="Select reason"
            />
          </Flex>
          <FormFieldError name="appointmentRatingReason" />
        </FormFieldContainer>
      </Flex>
    </Grid>
  )
}

export { Filters }
