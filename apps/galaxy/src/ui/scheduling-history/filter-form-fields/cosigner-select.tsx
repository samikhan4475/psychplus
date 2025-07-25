'use client'

import { useEffect, useState } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { getProvidersOptionsAction } from '@/ui/schedule/client-actions'
import { Option } from '@/ui/schedule/types'

const CosignerSelect = () => {
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
      <FormFieldLabel className="text-1 leading-[16px]">
        Cosigner
      </FormFieldLabel>
      <SelectInput
        field="cosignerUserId"
        placeholder="Select"
        loading={loading}
        options={options ?? []}
        buttonClassName="w-[120px] h-6"
        className="h-6 flex-1"
      />
    </FormFieldContainer>
  )
}

export { CosignerSelect }
