'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { Appointment, SelectOptionType } from '@/types'
import { getProvidersOptionsAction } from '../client-actions/get-provider-options'
import { SchemaType } from '../schema'

const ProviderDropdown = ({
  appointment,
  disabled,
}: {
  appointment?: Appointment
  disabled: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [location, providerId] = useWatch({
    control: form.control,
    name: ['location', 'providerId'],
  })

  useEffect(() => {
    if (!location || !appointment?.providerType) return
    setLoading(true)
    getProvidersOptionsAction({
      locationId: location,
      providerType: appointment?.providerType,
    }).then((res) => {
      setLoading(false)
      if (res.state === 'error') return
      setOptions(res.data)
    })
  }, [location, providerId, appointment?.providerType])

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <SelectInput
        field="providerId"
        placeholder="Select"
        options={options}
        buttonClassName="w-full h-6"
        onValueChange={(value) => {
          if (value && value !== providerId) {
            form.setValue('providerId', value)
          }
        }}
        className="w-[150px]"
        disabled={disabled}
        loading={loading}
      />
      <FormFieldError name="providerId" className="self-center" />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
