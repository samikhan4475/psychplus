'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { DateValue, I18nProvider } from 'react-aria-components'
import { useFormContext } from 'react-hook-form'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { getDateString } from '@/ui/schedule/utils'
import { getLocalCalendarDate } from '@/utils'
import { UpdateMedicationSchema } from './schema'

interface PrescriberInformationProps {
  index: number
}

const PrescriberInformation = ({ index }: PrescriberInformationProps) => {
  const form = useFormContext<UpdateMedicationSchema>()
  const getStaffDisplayString = (): string => {
    const staff = form.watch('staff')
    const name = `${staff?.legalName?.firstName ?? ''} ${
      staff?.legalName?.lastName ?? ''
    }`.trim()

    const businessAddress = staff?.contactInfo?.addresses?.find(
      (addr) => addr.type === 'Business',
    )

    const address = `${businessAddress?.street1 ?? ''}, ${
      businessAddress?.city ?? ''
    }, ${businessAddress?.state ?? ''} ${businessAddress?.postalCode ?? ''}`

    return `${name} | ${address}`
  }
  const effectiveDate = form.getValues(`drugList.${index}.effectiveDate`)
    ? getLocalCalendarDate(form.getValues(`drugList.${index}.effectiveDate`))
    : undefined
  const handleChange = (date?: DateValue) => {
    const formatttedDate = getDateString(date)
    form.setValue(`drugList.${index}.effectiveDate`, formatttedDate)
  }
  return (
    <Flex gap="2">
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Provider</FormFieldLabel>
        <TextField.Root
          value={getStaffDisplayString()}
          className=" h-6 w-full "
          size="1"
          disabled
          placeholder="Provider details"
        />
      </FormFieldContainer>

      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Effective Date</FormFieldLabel>
        <I18nProvider locale="en-US">
          <DatePickerInput
            yearFormat="YYYY"
            field={`drugList.${index}.effectiveDate`}
            handleChange={handleChange}
            value={effectiveDate}
          />
        </I18nProvider>
      </FormFieldContainer>
    </Flex>
  )
}

export { PrescriberInformation }
