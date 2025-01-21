'use client'

import { Path, useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { getCodeAttributeBoolean, useCodesetCodes } from '@/hooks'
import { transformInServices } from '../../transform'
import { Services } from '../../types'
import { getAttributeValue } from '../../utils'
import { maxBookingFrequencyMap } from './data'
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
        maxBookingFrequencyInSlot:
          maxBookingFrequencyMap[selectedServiceValue as Services] ?? '0',
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
      }
      Object.entries(values)?.forEach(([key, value]) => {
        setValue(key as Path<ServiceSchemaType>, value)
      })
    }
  }

  return (
    <FormFieldContainer className="col-span-3 gap-1">
      <FormFieldLabel>Service</FormFieldLabel>
      <SelectInput
        options={transformInServices(codes, locationType)}
        field="serviceOffered"
        onValueChange={onValueChange}
        buttonClassName="w-full h-7"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
