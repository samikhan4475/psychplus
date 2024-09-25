'use client'

import { ScrollArea } from '@radix-ui/themes'
import { AdditionalInfoCard } from './additional-info-card'
import { AddressCard } from './address'
import { AlternativeInfoCard } from './alternative-info-card'
import { CreateUserCard } from './create-user-card'
import { DescriptiveCard } from './descriptive-card'
import { PatientDataCard } from './patient-data'
import { PreferredPartnerCard } from './preferred-partner'
import { RelationshipCard } from './relationship'

const PatientDetails = () => {
  return (
    <ScrollArea
      className="max-h-[calc(100vh_-_180px)] min-w-[990px]"
      scrollbars="vertical"
    >
      <CreateUserCard />
      <PatientDataCard />
      <AddressCard />
      <PreferredPartnerCard />
      <RelationshipCard />
      <AdditionalInfoCard />
      <AlternativeInfoCard />
      <DescriptiveCard />
    </ScrollArea>
  )
}

export { PatientDetails }
