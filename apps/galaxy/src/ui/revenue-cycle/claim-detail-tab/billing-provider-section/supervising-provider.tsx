'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { ClaimUpdateSchemaType } from '../schema'
import { SearchClaimProviders } from './search-billing-provider'

const SupervisingProvider = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const isDisabled = form.formState.disabled

  const supervisingProvider = form.getValues('supervisingProviderName')
  const defaultsupervisingProvider: string | undefined = supervisingProvider
    ? `${supervisingProvider.firstName} ${supervisingProvider.lastName}`
    : undefined

  const handleSelect = (
    selectedItem: { value: string; label: string } | null,
  ) => {
    if (selectedItem) {
      form.setValue('supervisingProviderId', selectedItem.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    } else {
      form.setValue('supervisingProviderId', '', { shouldValidate: true })
    }
  }
  return (
    <Flex direction={'column'}>
      <Flex align="center" className={cn('text-[11px]')}>
        <Text as="label" wrap="nowrap" weight="medium">
          Supervising Provider
        </Text>
      </Flex>
      <SearchClaimProviders
        placeholder="Search Supervising Provider"
        onSelectItem={handleSelect}
        defaultValue={defaultsupervisingProvider}
        disabled={isDisabled}
      />
    </Flex>
  )
}

export { SupervisingProvider }
