'use client'

import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { PatientPreferredPartner } from '@/types'
import { PreferredPartnerTable } from './preferred-partner-table'

interface PreferredPartnerCardProps {
  preferredPartners: PatientPreferredPartner[]
}
const PreferredPartnerCard = ({
  preferredPartners,
}: PreferredPartnerCardProps) => {
  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <CardHeading title="Prefered Partner" />
      <Flex direction="column" p="2" gap="2">
        <PreferredPartnerTable preferredPartners={preferredPartners} />
      </Flex>
    </Flex>
  )
}

export { PreferredPartnerCard }
