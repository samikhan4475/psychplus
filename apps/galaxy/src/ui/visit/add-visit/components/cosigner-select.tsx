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
import { getProviders } from '../../client-actions'
import { Provider } from '../../types'
import { SchemaType } from '../schema'

const CosignerSelect = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<SelectOptionType[]>([])

  const [providerType, location, provider] = useWatch({
    control: form.control,
    name: ['providerType', 'location', 'provider'],
  })

  useEffect(() => {
    if (!providerType || !location) return
    else {
      ;(async () => {
        setLoading(true)
        const result = await getProviders({
          locationIds: [location],
          providerType: providerType,
        })

        setLoading(false)
        if (result.state === 'error') return setOptions([])

        const filteredOptions =
          result.data
            ?.filter((option) => option.id !== Number(provider))
            .map((provider: Provider) => ({
              label: `${provider.firstName} ${provider.lastName}, ${provider.honors}`,
              value: `${provider.id}`,
            })) ?? []

        setOptions(filteredOptions)
      })()
    }
  }, [location, providerType, provider])
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Cosigner</FormFieldLabel>
      <SelectInput
        field="cosignerId"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={!providerType}
        loading={loading}
      />
      <FormFieldError name="cosignerId" />
    </FormFieldContainer>
  )
}

export { CosignerSelect }
