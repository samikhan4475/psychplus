'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components'
import { SelectOptionType } from '@/types'
import { SearchClaimProviders } from '../../claim-detail-tab/billing-provider-section'
import { ClaimAddSchemaType } from '../schema'

const ClaimRenderingProviderSelect = () => {
  const form = useFormContext<ClaimAddSchemaType>()

  const handleSelect = (selectedItem: SelectOptionType | null) => {
    if (selectedItem) {
      form.setValue('renderingProviderId', selectedItem.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    } else {
      form.setValue('renderingProviderId', '', { shouldValidate: true })
    }
  }
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Rendering Provider</FormFieldLabel>
      <SearchClaimProviders
        placeholder="Rendering Provider"
        onSelectItem={handleSelect}
      />
      <FormFieldError name={`renderingProviderId`} />
    </FormFieldContainer>
  )
}

export { ClaimRenderingProviderSelect }
