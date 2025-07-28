'use client'

import { useEffect, useState } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { getProvidersOptionsAction } from '@/ui/schedule/client-actions'
import { Option } from '@/ui/schedule/types'

const ProviderSelect = () => {
  const [options, setOptions] = useState<Option[]>([])
  const [loading, setLoading] = useState(false)
  const fetchProvidersOptions = async () => {
    setLoading(true)
    const result = await getProvidersOptionsAction({}, true)

    if (result.state === 'success') {
      setOptions(result.data)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchProvidersOptions()
  }, [])
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <SelectInput
        field="providerUserId"
        loading={loading}
        options={options ?? []}
        placeholder="Select"
        buttonClassName="w-[150px] h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderSelect }