import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const AdmittingProviderSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Admitting Provider</FormFieldLabel>
      <AsyncSelect
        field="providerStaffId"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-[120px] h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { AdmittingProviderSelect }
