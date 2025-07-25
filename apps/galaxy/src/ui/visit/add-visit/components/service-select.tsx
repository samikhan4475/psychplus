'use client'

import { useEffect, useMemo, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { getCodeAttributeBoolean, useCodesetCodes } from '@/hooks'
import { SharedCode } from '@/types'
import { getLocationServices } from '../../client-actions'
import { SchemaType } from '../schema'
import { useAddVisitStore } from '../store'

const ServiceDropdown = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const form = useFormContext<SchemaType>()
  const { services, setServices } = useAddVisitStore()
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered)

  const locationId = useWatch({
    control: form.control,
    name: 'location',
  })

  const mappedServices: { [key: string]: SharedCode } = useMemo(() => {
    return serviceCodes.reduce<{ [key: string]: SharedCode }>((acc, curr) => {
      acc[curr.value] = curr
      return acc
    }, {})
  }, [serviceCodes])

  useEffect(() => {
    if (!locationId) return
    form.resetField('service')
    setLoading(true)
    getLocationServices({ locationIds: [locationId] }).then((res) => {
      setLoading(false)
      if (res.state === 'error') {
        setServices([])
        return toast.error(res.error || 'Failed to fetch services')
      }
      const activeServices = res.data.filter((service) => {
        return getCodeAttributeBoolean(
          mappedServices[service.serviceOffered],
          'IsActive',
        )
      })
      setServices(activeServices)
    })
  }, [locationId])

  const options = services.map((v) => ({
    label: mappedServices[v.serviceOffered]?.display,
    value: v.id,
  }))

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Service</FormFieldLabel>
      <SelectInput
        field="service"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={!locationId}
        loading={loading}
        onValueChange={(value) => {
          const selectedService = services.find((option) => option.id === value)
          form.setValue(
            'isServiceTimeDependent',
            !!selectedService?.isServiceTimeDependent,
          )
          form.setValue('service', value)
          form.resetField('providerType')
          form.resetField('provider')
          form.resetField('visitType')
          form.resetField('visitSequence')
          form.resetField('visitMedium')
          form.resetField('duration')
        }}
      />
      <FormFieldError name={'service'} />
    </FormFieldContainer>
  )
}

export { ServiceDropdown }
