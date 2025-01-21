import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const ProviderSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Default Provider</FormFieldLabel>
      <AsyncSelect
        field="defaultProviderStaffId"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="min-w-[126px] h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
