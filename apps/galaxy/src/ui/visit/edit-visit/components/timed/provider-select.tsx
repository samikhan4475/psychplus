'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getProviders } from '@/ui/visit/client-actions'
import { Provider } from '../../../types'
import { SchemaType } from '../../schema'
import { useEditVisitStore } from '../../store'

const ProviderSelect = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [providers, setProviders] = useState<Provider[]>([])
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const { setUserId } = useEditVisitStore()

  const [providerType, location] = useWatch({
    control: form.control,
    name: ['providerType', 'location'],
  })

  useEffect(() => {
    if (!location || !providerType) return
    setLoading(true)
    getProviders({
      locationIds: [location],
      providerType,
    }).then((res) => {
      setLoading(false)
      if (res.state === 'error') {
        toast.error(res.error || 'Failed to fetch providers')
        return setOptions([])
      }
      setProviders(res.data || [])
      setOptions(
        res.data.map((provider: Provider) => ({
          value: `${provider.id}`,
          label: `${provider.firstName} ${provider.lastName}, ${provider.honors}`,
        })),
      )
    })
  }, [providerType, location])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider</FormFieldLabel>
      <SelectInput
        options={options}
        buttonClassName="h-6 w-full"
        field="provider"
        loading={loading}
        onValueChange={(value) => {
          form.setValue('provider', value)
          setUserId(
            providers.find((provider) => provider.id === +value)?.userId ?? 0,
          )
        }}
      />
      <FormFieldError name="provider" />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
