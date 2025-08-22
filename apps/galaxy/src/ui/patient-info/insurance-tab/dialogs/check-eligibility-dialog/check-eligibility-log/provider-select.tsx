import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { getProvidersOptionsAction } from '@/actions'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from './check-eligibility-filter-form'


const ProviderSelect = () => {
  const form = useFormContext<SchemaType>()
  const [practiceId, locationId] = form.watch(['practiceId', 'locationId'])

  const fetchOptions = useCallback(() => {
    if (!practiceId)
      return Promise.resolve({ state: 'success' as const, data: [] })
    form.setValue('providerStaffId', '')
    return getProvidersOptionsAction({
      practicesIds: [practiceId],
      isIncludePractices: true,
    })
  }, [practiceId, locationId])
  return (
    <FormFieldContainer className="flex-row gap-x-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncSelect
        field="providerStaffId"
        placeholder="Select"
        disabled={!practiceId}
        fetchOptions={fetchOptions}
        buttonClassName="w-[180px] border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
        className="h-full flex-1"
      />
      <FormFieldError name="providerStaffId" />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
