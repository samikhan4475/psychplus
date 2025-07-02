'use client'

import { Flex, RadioGroup, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddressFieldsGroup } from '@/components'
import { ServiceClaimAddress } from '../../types'
import { ServiceSchemaType } from './schema'

interface ClaimAddressBlockProps {
  claimAddress?: Partial<ServiceClaimAddress>
}

const ClaimAddressBlock = ({ claimAddress }: ClaimAddressBlockProps) => {
  const form = useFormContext<ServiceSchemaType>()
  const isClaimAddress = form.watch('isClaimAddress')

  const onValueChange = (value: string) => {
    const isClaimAddress = value === 'Yes'
    form.setValue('isClaimAddress', isClaimAddress)
    if (isClaimAddress) {
      form.setValue('address1', claimAddress?.street1 ?? '')
      form.setValue('address2', claimAddress?.street2 ?? '')
      form.setValue('city', claimAddress?.city ?? '')
      form.setValue('state', claimAddress?.state ?? '')
      form.setValue('zip', claimAddress?.postalCode ?? '')
      form.setValue('postalPlus4Code', claimAddress?.postalPlus4Code ?? '')
      form.setValue('stateId', claimAddress?.stateId ?? '')
      form.setValue('cityId', claimAddress?.cityId ?? '')
      form.trigger([
        'address1',
        'address2',
        'city',
        'state',
        'zip',
        'postalPlus4Code',
      ])
    } else {
      form.setValue('address1', '')
      form.setValue('address2', '')
      form.setValue('city', '')
      form.setValue('state', '')
      form.setValue('zip', '')
      form.setValue('postalPlus4Code', '')
      form.setValue('stateId', '')
      form.setValue('cityId', '')
    }
  }

  return (
    <Flex direction="column" gap="1">
      <Flex align="center" justify="between">
        <Text size="1" className="font-bold">
          Claim Address
        </Text>
        <Flex className="bg-pp-bg-accent items-center gap-5 rounded-2 px-2 py-1">
          <Text size="1" className="font-bold">
            Is your claim address same as Primary?
          </Text>
          <RadioGroup.Root
            className="flex-row gap-2 font-bold"
            size="1"
            value={isClaimAddress ? 'Yes' : 'No'}
            onValueChange={onValueChange}
            highContrast
          >
            <RadioGroup.Item value="No">No</RadioGroup.Item>
            <RadioGroup.Item value="Yes">Yes</RadioGroup.Item>
          </RadioGroup.Root>
        </Flex>
      </Flex>
      <AddressFieldsGroup columnsPerRow="2" disabled={isClaimAddress} />
    </Flex>
  )
}

export { ClaimAddressBlock }
