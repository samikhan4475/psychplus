'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getProviders } from '../../../client-actions'
import { Provider } from '../../../types'
import { SchemaType } from '../../schema'

const ProviderDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<SelectOptionType[]>([])

  const [providerType, location] = useWatch({
    control: form.control,
    name: ['providerType', 'location'],
  })

  useEffect(() => {
    form.resetField('provider')
    if (!providerType || !location) return
    setLoading(true)
    getProviders({
      locationIds: [location],
      providerType: providerType,
    }).then((res) => {
      setLoading(false)
      if (res.state === 'error') return setOptions([])
      setOptions(
        res.data.map((provider: Provider) => ({
          label: `${provider.firstName} ${provider.lastName}`,
          value: `${provider.id}`,
        })),
      )
    })
  }, [location, providerType])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider</FormFieldLabel>
      <SelectInput
        field="provider"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={!providerType}
        loading={loading}
      />
      <FormFieldError name="provider" />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
