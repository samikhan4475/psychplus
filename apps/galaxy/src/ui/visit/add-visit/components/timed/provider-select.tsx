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
import { useAddVisitStore } from '../../store'

const ProviderDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [providers, setProviders] = useState<Provider[]>([])
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const { setUserId } = useAddVisitStore((store) => ({
    setUserId: store.setUserId,
  }))

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
      setProviders(res.data || [])
      setOptions(
        res.data.map((provider: Provider) => ({
          label: `${provider.firstName} ${provider.lastName}, ${provider.honors}`,
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
        onValueChange={(value) => {
          form.setValue('provider', value)
          setUserId(
            providers.find((provider) => provider.id === +value)?.userId,
          )
        }}
      />
      <FormFieldError name="provider" />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
