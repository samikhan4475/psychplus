import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { ProfileSchemaType } from './profile-form'

const DefaultProviderSelect = () => {
  const form = useFormContext<ProfileSchemaType>()
  const { id } = form.watch()

  const fetchOptions = useCallback(() => {
    if (!id) return Promise.resolve({ state: 'success' as const, data: [] })
    return getProvidersOptionsAction({ practicesIds: [id] })
  }, [id])
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Def. Provider</FormFieldLabel>
      <AsyncSelect
        field="defaultProviderStaffId"
        placeholder="Select"
        fetchOptions={fetchOptions}
        buttonClassName="w-full border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { DefaultProviderSelect }
