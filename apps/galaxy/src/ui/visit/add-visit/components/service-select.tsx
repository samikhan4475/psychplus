'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getLocationServices } from '../../actions'
import { SchemaType } from '../schema'
import { useAddVisitStore } from '../store'

const ServiceDropdown = () => {
  const form = useFormContext<SchemaType>()
  const { services, setServices } = useAddVisitStore()
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered)
  const prevLocationId = useRef<string | undefined>(undefined)

  const locationId = form.watch('location')

  const mappedServices: { [key: string]: string } = useMemo(() => {
    return serviceCodes.reduce<{ [key: string]: string }>((acc, curr) => {
      acc[curr.value] = curr.display
      return acc
    }, {})
  }, [serviceCodes])

  useEffect(() => {
    if (prevLocationId.current !== locationId) {
      prevLocationId.current = locationId
      if (locationId) {
        form.resetField('service')
        getLocationServices({ locationId }).then((res) => {
          if (res.state === 'error') return setServices([])
          setServices(res.data)
        })
      }
    }
  }, [locationId])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Service</FormFieldLabel>
      <SelectInput
        field="service"
        options={services.map((v) => ({
          label: mappedServices[v.serviceOffered],
          value: v.id,
        }))}
        buttonClassName="flex-1 w-full"
        disabled={!locationId}
        onValueChange={(value) => {
          const selectedService = services.find((option) => option.id === value)
          form.setValue(
            'isServiceTimeDependent',
            !!selectedService?.isServiceTimeDependent,
          )
          form.setValue('service', value)
          form.resetField('providerType')
          form.resetField('nonTimeProviderType')
          form.resetField('provider')
          form.resetField('visitType')
          form.resetField('visitSequence')
          form.resetField('visitMedium')
        }}
      />
      <FormFieldError name={'service'} />
    </FormFieldContainer>
  )
}

export { ServiceDropdown }
