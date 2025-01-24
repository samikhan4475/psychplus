'use client'

import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Service } from '@/types'
import { getLocationServicesAction } from '../actions'
import { SchedulingHistorySchemaType } from '../schema'

const ServiceSelect = () => {
  const form = useFormContext<SchedulingHistorySchemaType>()
  const selectedLocation = form.watch('locationId')
  const [servicesOptions, setServicesOptions] = useState<Service[]>([])
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered)

  const mappedServices: Record<string, string> = useMemo(() => {
    return Object.fromEntries(
      serviceCodes.map(({ value, display }) => [value, display]),
    )
  }, [serviceCodes])

  useEffect(() => {
    if (selectedLocation) {
      getLocationServicesAction([selectedLocation]).then((response) => {
        if (response.state === 'error') setServicesOptions([])
        else setServicesOptions(response.data)
      })
    }
  }, [selectedLocation])

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Service</FormFieldLabel>
      <SelectInput
        field="serviceId"
        disabled={!selectedLocation}
        options={servicesOptions.map((v) => ({
          label: mappedServices[v.serviceOffered],
          value: v.id,
        }))}
        buttonClassName="w-[120px] h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
