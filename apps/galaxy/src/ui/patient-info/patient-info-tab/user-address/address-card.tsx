'use client'

import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'

interface DescriptiveCardProps {
  patientId: string
}

const UserAddressCard = ({ patientId }: DescriptiveCardProps) => {
  return (
    <Flex direction="column" className="bg-white shadow-2">
      <CardHeading title="Addresss" />
      <Flex direction="column" px="2" py="2" gap="2">
        <Flex align="start" gap="2"></Flex>
      </Flex>
    </Flex>
  )
}

export { UserAddressCard }
