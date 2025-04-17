import { Flex } from '@radix-ui/themes'
import { FeatureCard, FeatureContainer, FeatureHeading } from '@/components-v2'
import { ActiveMedicationsTable } from '@/features/medications'

const MedicationsPage = () => {
  return (
    <Flex direction="column" gap="5">
      <FeatureHeading>Medications</FeatureHeading>
      <FeatureContainer>
        <FeatureCard title="Active Medications" contentClassName="p-2">
          <ActiveMedicationsTable />
        </FeatureCard>
      </FeatureContainer>
    </Flex>
  )
}

export default MedicationsPage
