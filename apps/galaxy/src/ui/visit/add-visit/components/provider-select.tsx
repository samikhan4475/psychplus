'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getProviders } from '../actions'
import { SchemaType } from '../schema'
import { Provider } from '../types'

const ProviderDropdown = () => {
  const form = useFormContext<SchemaType>()
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const prevProviderType = useRef<string | undefined>(undefined)
  const prevLocation = useRef<string | undefined>(undefined)

  const providerType = form.watch('providerType')
  const location = form.watch('location')

  useEffect(() => {
    if (
      prevProviderType.current !== providerType ||
      prevLocation.current !== location
    ) {
      prevProviderType.current = providerType
      prevLocation.current = location
      form.resetField('provider')

      if (providerType && location) {
        getProviders({
          locationIds: [location],
        }).then((res) => {
          if (res.state === 'error') return setOptions([])
          setOptions(
            res.data.map((provider: Provider) => ({
              label: `${provider.firstName} ${provider.lastName}`,
              value: `${provider.id}`,
            })),
          )
        })
      }
    }
  }, [location, providerType])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider</FormFieldLabel>
      <SelectInput
        field="provider"
        options={options}
        buttonClassName="flex-1"
        disabled={!providerType}
      />
      <FormFieldError name="provider" />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
