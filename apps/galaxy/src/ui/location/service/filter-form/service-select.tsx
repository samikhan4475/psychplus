'use client'

import { useFormContext } from 'react-hook-form'
import { SelectInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { transformInOptions } from '../transform'
import { getMaxBookingFrequency } from '../utils'
import { ServiceFiltersSchemaType } from './schema'

const ServiceSelect = () => {
  const { setValue } = useFormContext<ServiceFiltersSchemaType>()
  const codes = useCodesetCodes(CODESETS.ServicesOffered)
  const options = useCodesetOptions(CODESETS.ServicesOffered, '', [
    CODE_NOT_SET,
  ])

  const onValueChange = (selectedServiceValue: string) => {
    const selectedCode = codes.find(
      (service) => service?.value === selectedServiceValue,
    )
    if (selectedCode) {
      setValue('serviceOffered', selectedServiceValue)
      setValue(
        'maxBookingFrequencyInSlot',
        getMaxBookingFrequency(selectedServiceValue, selectedCode),
      )
      setValue('maxBookingFrequency', '')
    }
  }

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Service</FormFieldLabel>
      <SelectInput
        options={transformInOptions(options)}
        field="serviceOffered"
        onValueChange={onValueChange}
        buttonClassName="w-[120px]"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
