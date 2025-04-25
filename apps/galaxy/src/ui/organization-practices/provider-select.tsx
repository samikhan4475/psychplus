import React, { useEffect, useState } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getProvidersOptionsAction } from '@/ui/schedule/client-actions'

const ProviderSelect = () => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    ;(async () => {
      setDisabled(false)
      setLoading(true)
      const result = await getProvidersOptionsAction()
      if (result.state === 'success') {
        setOrganizations(result.data)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Default Provider</FormFieldLabel>
      <SelectInput
        field="defaultProviderStaffId"
        options={organizations}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-[101px] border border-solid !outline-none [box-shadow:none]"
        className="w-full"
        loading={loading}
        disabled={disabled}
      />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
