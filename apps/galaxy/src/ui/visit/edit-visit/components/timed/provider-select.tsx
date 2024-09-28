'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getProviders } from '@/ui/visit/actions'
import { Provider } from '../../../types'
import { SchemaType } from '../../schema'

const ProviderSelect = () => {
  const form = useFormContext<SchemaType>()
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const prevProviderType = useRef<string | undefined>(undefined)
  const prevLocation = useRef<string | undefined>(undefined)

  const providerType = form.watch('providerType')
  const location = form.watch('location')

  useEffect(() => {
    if (
      prevLocation.current !== location ||
      prevProviderType.current !== providerType
    ) {
      prevLocation.current = location
      prevProviderType.current = providerType
      form.resetField('provider')

      if (location && providerType) {
        getProviders({
          locationIds: [location],
        }).then((res) => {
          if (res.state === 'error') {
            toast.error('Failed to fetch providers')
            return setOptions([])
          }
          setOptions(
            res.data.map((provider: Provider) => ({
              value: `${provider.id}`,
              label: `${provider.firstName} ${provider.lastName}`,
            })),
          )
        })
      }
    }
  }, [providerType, location])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider</FormFieldLabel>
      <SelectInput
        options={options}
        buttonClassName="flex-1 w-full"
        field="provider"
      />
      <FormFieldError name="provider" />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
