'use client'

import { Path, useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { getCodeAttributeBoolean, useCodesetCodes } from '@/hooks'
import { transformInServices } from '../../transform'
import { getAttributeValue, getMaxBookingFrequency } from '../../utils'
import { ServiceSchemaType } from './schema'

const ServiceSelect = () => {
  const { setValue, watch } = useFormContext<ServiceSchemaType>()
  const locationType = watch('locationType')
  const codes = useCodesetCodes(CODESETS.ServicesOffered)
  const onValueChange = (selectedServiceValue: string) => {
    const selectedCode = codes.find(
      (service) => service?.value === selectedServiceValue,
    )
    if (selectedCode) {
      const values = {
        serviceOffered: selectedServiceValue,
        maxBookingFrequencyInSlot: getMaxBookingFrequency(
          selectedServiceValue,
          selectedCode,
        ),
        isServiceTimeDependent: getCodeAttributeBoolean(
          selectedCode,
          'IsTimeDependent',
        )
          ? 'yes'
          : 'no',
        servicePlace: getAttributeValue(selectedCode, 'PlaceOfService'),
        isPrimaryProviderRequired: getCodeAttributeBoolean(
          selectedCode,
          'IsPrimaryProviderRequired',
        )
          ? 'yes'
          : 'no',
        serviceVisitTypes: [],
      }
      Object.entries(values)?.forEach(([key, value]) => {
        setValue(key as Path<ServiceSchemaType>, value)
      })
    }
  }

  return (
    <FormFieldContainer className="col-span-3 gap-1">
      <FormFieldLabel required>Service</FormFieldLabel>
      <SelectInput
        options={transformInServices(codes, locationType)}
        field="serviceOffered"
        onValueChange={onValueChange}
        buttonClassName="w-full h-7"
        size="1"
      />
      <FormFieldError name="serviceOffered" />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
