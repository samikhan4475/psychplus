'use client'

import { useEffect, useState } from 'react'
import { CalendarDate } from '@internationalized/date'
import { Box, Flex, Grid } from '@radix-ui/themes'
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
    <>
      <Grid
        className="col-span-full"
        gap="4"
        align="baseline"
        columns={{ initial: '1', sm: '8', md: '16' }}
      >
        <Box className="col-span-2 sm:col-span-4 md:col-span-2">
          <FormFieldContainer className="flex-1 flex-row">
            <FormFieldLabel className="!text-1">From Date</FormFieldLabel>
            <DatePickerInput
              className="w-[120px]"
              field="fromDateTime"
              maxValue={watch('toDateTime') ?? undefined}
              dateInputClass="h-6"
              minValue={new CalendarDate(2000, 1, 1)}
            />
          </FormFieldContainer>
        </Box>
        <Box className="col-span-2 sm:col-span-4 md:col-span-2">
          <FormFieldContainer className="flex-1 flex-row gap-1">
            <FormFieldLabel className="!text-1">To Date</FormFieldLabel>
            <DatePickerInput
              className="w-[120px]"
              field="toDateTime"
              isDisabled={!isToDateDisabled}
              minValue={watch('fromDateTime') ?? undefined}
              dateInputClass="h-6"
            />
          </FormFieldContainer>
        </Box>
        <Box className="col-span-2 sm:col-span-4 md:col-span-2">
          <FormFieldContainer className="gap-1">
            <TextInput
              field="patientFirstName"
              label="First Name"
              placeHolder="First Name"
            />
          </FormFieldContainer>
        </Box>
        <Box className="col-span-2 sm:col-span-4 md:col-span-2">
          <FormFieldContainer className="gap-1">
            <TextInput
              field="patientLastName"
              label="Last Name"
              placeHolder="Last Name"
            />
          </FormFieldContainer>
        </Box>
        <Box className="col-span-2 sm:col-span-4 md:col-span-2">
          <FormFieldContainer className="gap-1">
            <Flex gap="1">
              <FormFieldLabel className="!text-1">Age</FormFieldLabel>
              <NumericInput
                field="age"
                allowNegative={false}
                prefix=""
                placeholder="Age"
                maxLimit={1000}
                decimalScale={0}
                containerClassName="w-full"
                className="border-pp-gray-2 h-6 w-[122px] border border-solid !outline-none [box-shadow:none]"
              />
            </Flex>
            <FormFieldError name="age" />
          </FormFieldContainer>
        </Box>
        <Box className="col-span-2 sm:col-span-4 md:col-span-2">
          <FormFieldContainer className="flex-row gap-1">
            <FormFieldLabel className="!text-1">Gender</FormFieldLabel>
            <DropdownSelect field="gender" options={genderOptions} />
          </FormFieldContainer>
        </Box>
        <Box className="col-span-2 sm:col-span-4 md:col-span-2">
          <FormFieldContainer className="flex-row gap-1">
            <FormFieldLabel className="!text-1">DOB</FormFieldLabel>
            <DatePickerInput
              className="w-[122px]"
              field="dateOfBirth"
              yearFormat="YYYY"
            />
          </FormFieldContainer>
        </Box>
      </Grid>

      <Grid
        className="col-span-full"
        gap="4"
        align="baseline"
        columns={{ initial: '1', sm: '8', md: '26' }}
      >
        <Box className="col-span-3 sm:col-span-6 md:col-span-4">
          <LocationsSelect />
        </Box>
        <Box className="col-span-3 sm:col-span-6 md:col-span-4">
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
        </Box>

        <Box className="col-span-3 sm:col-span-8 md:col-span-5">
          <FormFieldContainer className="flex-row items-center gap-1">
            <FormFieldLabel className="!text-1">
              Primary/Sec. Insurance
            </FormFieldLabel>

            <MultiSelectField
              defaultValues={watch('payerPlanIds')}
              options={insurancePayers}
              className="flex-1"
              onChange={(values) => {
                setValue('payerPlanIds', values, {
                  shouldDirty: true,
                })
              }}
              menuClassName="w-[155px]"
            />

            <FormFieldError name="payerPlanIds" />
          </FormFieldContainer>
        </Box>

        <Box className="col-span-2 sm:col-span-4 md:col-span-3">
          <FormFieldContainer className={'flex-row items-center gap-1'}>
            <FormFieldLabel className={'shrink-0'}>Rating</FormFieldLabel>
            <SelectInput
              field="rating"
              className={'min-w-0 flex-1'}
              buttonClassName={
                'w-full min-w-0 h-6 border border-solid border-pp-gray-2 !outline-none [box-shadow:none] w-[120px]'
              }
              options={ratings}
            />
            <FormFieldError name="rating" />
          </FormFieldContainer>
        </Box>

        <Box className="md:col-span-13 col-span-8 sm:col-span-4">
          <FormFieldContainer className={'flex-row items-center gap-1'}>
            <FormFieldLabel className={'shrink-0 !text-1'}>
              Reason
            </FormFieldLabel>

            <Flex className={'min-w-0 flex-1'}>
              <CodesetSelect
                name="appointmentRatingReason"
                codeset={CODESETS.AppointmentRatingReason}
                className="border-pp-gray-2 h-7 w-full min-w-0 border border-solid text-1 !outline-none [box-shadow:none]"
                size="1"
                placeholder="Select reason"
              />
            </Flex>

            <FormFieldError name="appointmentRatingReason" />
          </FormFieldContainer>
        </Box>
      </Grid>
    </>
  )
}

export { Filters }
