'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { SearchClaimProviders } from './search-billing-provider'
import { ClaimUpdateSchemaType } from '../schema'

const OrderingProvider = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const isDisabled = form.formState.disabled

  const orderingProvider = form.getValues('orderingProviderName')
  const defaultorderingProvider: string | undefined = orderingProvider
    ? `${orderingProvider.firstName} ${orderingProvider.lastName}`
    : undefined

  const handleSelect = (
    selectedItem: { value: string; label: string } | null,
  ) => {
    if (selectedItem) {
      form.setValue('orderingProviderId', selectedItem.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    } else {
      form.setValue('orderingProviderId', '', { shouldValidate: true })
    }
  }

  return (
    <Flex direction={'column'}>
      <Flex align="center" className={cn('text-[11px]')}>
        <Text as="label" wrap="nowrap" weight="medium">
          Ordering Provider
        </Text>
      </Flex>
      <SearchClaimProviders
        placeholder="Search Ordering Provider"
        onSelectItem={handleSelect}
        defaultValue={defaultorderingProvider}
        disabled={isDisabled}
      />
    </Flex>
  )
}

export { OrderingProvider }
