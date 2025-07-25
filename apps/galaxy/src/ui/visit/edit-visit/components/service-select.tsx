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
import { useEditVisitStore } from '../store'

const ServiceSelect = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const { services, setServices, setUserId } = useEditVisitStore()
  const serviceCodes = useCodesetCodes(CODESETS.ServicesOffered)

  const [locationId, isServiceTimeDependent] = useWatch({
    control: form.control,
    name: ['location', 'isServiceTimeDependent'],
  })

  const mappedServices: Record<string, SharedCode> = useMemo(() => {
    return Object.fromEntries(serviceCodes.map((code) => [code.value, code]))
  }, [serviceCodes])

  useEffect(() => {
    if (!locationId) return
    setLoading(true)
    getLocationServices({ locationIds: [locationId] }).then((res) => {
      setLoading(false)
      if (res.state === 'error') {
        toast.error(res.error || 'Failed to fetch services')
        return setServices([])
      }
      const activeServices = res.data.filter((service) => {
        const code = mappedServices[service.serviceOffered]
        return getCodeAttributeBoolean(code, 'IsActive')
      })
      setServices(activeServices)
    })
  }, [locationId])

  const serviceOptions = services.map((v) => ({
    value: v.id,
    label: mappedServices[v.serviceOffered]?.display,
  }))

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Service</FormFieldLabel>
      <SelectInput
        field="service"
        options={serviceOptions}
        buttonClassName="h-6 w-full"
        onValueChange={(value) => {
          const selectedService = services.find((option) => option.id === value)
          form.setValue(
            'isServiceTimeDependent',
            !!selectedService?.isServiceTimeDependent,
          )
          form.setValue('service', value)
          form.setValue('providerType', '')
          form.setValue('provider', '')
          setUserId(0)
          form.setValue('visitType', '')
          form.setValue('visitSequence', '')
          form.setValue('visitMedium', '')
          form.setValue('duration', '')
        }}
        disabled={!isServiceTimeDependent}
        loading={loading}
      />
      <FormFieldError name={'service'} />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
