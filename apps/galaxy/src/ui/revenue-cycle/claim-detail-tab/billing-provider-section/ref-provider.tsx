'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { ClaimUpdateSchemaType } from '../schema'
import { SearchClaimProviders } from './search-billing-provider'

const RefProvider = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const isDisabled = form.formState.disabled
  const referringProvider = form.getValues('referringProviderName')
  const defaultreferringProvider: string | undefined = referringProvider
    ? `${referringProvider.firstName} ${referringProvider.lastName}`
    : undefined

  const handleSelect = (
    selectedItem: { value: string; label: string } | null,
  ) => {
    if (selectedItem) {
      form.setValue('referringProviderId', selectedItem.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    } else {
      form.setValue('referringProviderId', '', { shouldValidate: true })
    }
  }
  return (
    <Flex direction={'column'}>
      <Flex align="center" className={cn('text-[11px]')}>
        <Text as="label" wrap="nowrap" weight="medium">
          Ref. Provider
        </Text>
      </Flex>
      <SearchClaimProviders
        placeholder="Search Ref. Provider"
        onSelectItem={handleSelect}
        defaultValue={defaultreferringProvider}
        disabled={isDisabled}
      />
    </Flex>
  )
}

export { RefProvider }
