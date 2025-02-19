'use client'

import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Service } from '@/types'
import { getLocationServicesAction } from '../client-actions'
import { ActiveVisitSchemaType } from './schema'

const VisitServiceSelect = () => {
  const form = useFormContext<ActiveVisitSchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
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
      setLoading(true)
      getLocationServicesAction([selectedLocation]).then((response) => {
        if (response.state === 'error') {
          setLoading(false)
          setServicesOptions([])
          return toast.error(response?.error)
        }
        setServicesOptions(response.data)
        setLoading(false)
      })
    }
  }, [selectedLocation])

  return (
    <FormFieldContainer className="flex-1 gap-0.5">
      <FormFieldLabel>Visit Service</FormFieldLabel>
      <SelectInput
        disabled={!selectedLocation}
        options={servicesOptions.map((v) => ({
          label: mappedServices[v.serviceOffered],
          value: v.id,
        }))}
        buttonClassName="flex-1 w-full h-6"
        loading={loading}
        field="serviceId"
      />
    </FormFieldContainer>
  )
}

export { VisitServiceSelect }
