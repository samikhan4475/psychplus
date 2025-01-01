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
import { useCodesetCodes } from '@/hooks'
import { getLocationServices } from '../../actions'
import { SchemaType } from '../schema'
import { useEditVisitStore } from '../store'

const ServiceSelect = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const { services, setServices } = useEditVisitStore()
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered)

  const [locationId, isServiceTimeDependent] = useWatch({
    control: form.control,
    name: ['location', 'isServiceTimeDependent'],
  })

  const mappedServices: Record<string, string> = useMemo(() => {
    return Object.fromEntries(
      serviceCodes.map(({ value, display }) => [value, display]),
    )
  }, [serviceCodes])

  useEffect(() => {
    if (!locationId) return
    form.resetField('service')
    setLoading(true)
    getLocationServices({ locationId }).then((res) => {
      setLoading(false)
      if (res.state === 'error') {
        toast.error(res.error || 'Failed to fetch services')
        return setServices([])
      }
      setServices(res.data)
    })
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
        buttonClassName="h-6 w-full"
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
        }}
        disabled={!isServiceTimeDependent}
        loading={loading}
      />
      <FormFieldError name={'service'} />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
