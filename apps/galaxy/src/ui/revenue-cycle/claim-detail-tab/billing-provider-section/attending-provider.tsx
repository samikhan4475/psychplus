'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { ClaimUpdateSchemaType } from '../schema'
import { SearchClaimProviders } from './search-billing-provider'

const AttendingProvider = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()
  const isDisabled = form.formState.disabled

  const attendingProvider = form.getValues('attendingProviderName')
  const defaultAttendingProvider: string | undefined = attendingProvider
    ? `${attendingProvider.firstName} ${attendingProvider.lastName}`
    : undefined

  const handleSelect = (
    selectedItem: { value: string; label: string } | null,
  ) => {
    if (selectedItem) {
      form.setValue('attendingProviderId', selectedItem.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    } else {
      form.setValue('attendingProviderId', '', { shouldValidate: true })
    }
  }

  return (
    <Flex direction="column">
      <Flex align="center" className={cn('text-[11px]')}>
        <Text as="label" wrap="nowrap" weight="medium">
          Attending Provider
        </Text>
      </Flex>
      <SearchClaimProviders
        placeholder="Search Attending Provider"
        onSelectItem={handleSelect}
        defaultValue={defaultAttendingProvider}
        disabled={isDisabled}
      />
    </Flex>
  )
}

export { AttendingProvider }
