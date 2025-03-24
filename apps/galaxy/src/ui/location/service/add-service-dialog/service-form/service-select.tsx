'use client'

import { useEffect } from 'react'
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
import {
  getAttributeValue,
  getMaxBookingFrequency,
  getYesNoValue,
} from '../../utils'
import { ServiceSchemaType } from './schema'

const ServiceSelect = () => {
  const { setValue, watch } = useFormContext<ServiceSchemaType>()
  const locationType = watch('locationType')
  const serviceOffered = watch('serviceOffered')
  const isPrimaryProviderRequired = watch('isPrimaryProviderRequired')
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
        isServiceTimeDependent: getYesNoValue(
          getCodeAttributeBoolean(selectedCode, 'IsTimeDependent'),
        ),
        servicePlace: getAttributeValue(selectedCode, 'PlaceOfService'),
        isPrimaryProviderRequired: getYesNoValue(
          getCodeAttributeBoolean(selectedCode, 'IsPrimaryProviderRequired'),
        ),
        serviceVisitTypes: [],
      }
      Object.entries(values)?.forEach(([key, value]) => {
        setValue(key as Path<ServiceSchemaType>, value)
      })
    }
  }

  useEffect(() => {
    const selectedCode = codes?.find(
      (service) => service?.value === serviceOffered,
    )
    if (selectedCode && !isPrimaryProviderRequired) {
      setValue(
        'isPrimaryProviderRequired',
        getYesNoValue(
          getCodeAttributeBoolean(selectedCode, 'IsPrimaryProviderRequired'),
        ),
        { shouldValidate: true },
      )
    }
  }, [serviceOffered, codes, isPrimaryProviderRequired, setValue])
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
