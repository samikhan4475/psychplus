import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './schema'

const ProviderSelect = () => {
  const form = useFormContext<SchemaType>()
  const practiceId = form.watch('practiceId')

  const fetchOptions = useCallback(() => {
    if (!practiceId)
      return Promise.resolve({ state: 'success' as const, data: [] })
    return getProvidersOptionsAction({ practicesIds: [practiceId] })
  }, [practiceId])
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Provider</FormFieldLabel>
      <AsyncSelect
        field="providerId"
        placeholder="Select"
        disabled={!practiceId}
        fetchOptions={fetchOptions}
        buttonClassName="w-full border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
