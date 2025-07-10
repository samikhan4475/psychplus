'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { SelectOptionType, Service } from '@/types'
import { getLocationServices } from '@/ui/visit/client-actions'

const ServiceSelect = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const form = useFormContext()
  const [services, setServices] = useState<Service[]>([])
  const [serviceOptions, setServiceOptions] = useState<SelectOptionType[]>([])
  const options = useCodesetOptions(CODESETS.ServicesOffered, '', [
    CODE_NOT_SET,
  ])

  useEffect(() => {
    form.resetField('service')
    setLoading(true)
    getLocationServices({}).then((res) => {
      setLoading(false)
      if (res.state === 'error') {
        setServices([])
        return toast.error(res.error || 'Failed to fetch services')
      }
      setServices(res.data)
      const duplicated = new Set<string>()
      const transformedData: SelectOptionType[] = []
      res.data.forEach((data) => {
        if (!duplicated.has(data.serviceOffered)) {
          duplicated.add(data.serviceOffered)
          transformedData.push({
            value: data.serviceOffered,
            label:
              options?.find((option) => option.value === data.serviceOffered)
                ?.label ?? data.serviceOffered,
          })
        }
      })
      setServiceOptions(transformedData)
    })
  }, [])
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Service</FormFieldLabel>
      <SelectInput
        field="service"
        options={serviceOptions}
        buttonClassName="h-6 w-full"
        loading={loading}
        onValueChange={(value) => {
          const selected = services.find((v) => v.serviceOffered === value)
          if (!selected) return
          form.setValue('serviceId', selected.id)
          form.setValue('service', selected.serviceOffered)
          form.resetField('visitType')
          form.resetField('visitTypeId')
        }}
      />
      <FormFieldError name={'service'} />
    </FormFieldContainer>
  )
}

export { ServiceSelect }
