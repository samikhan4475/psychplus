import { Flex } from '@radix-ui/themes'
import { FeatureFlag } from '@/types/feature-flag'
import { AlertDialog } from './alert-dialog'
import { PharmacyWidget } from './pharmacy-widget'

interface PharmacyViewProps {
  patientId: string
  featureFlags: FeatureFlag[]
}

const PharmacyView = ({ patientId, featureFlags }: PharmacyViewProps) => {
  return (
    <Flex direction="column" width="100%" gap="1">
      <PharmacyWidget patientId={patientId} featureFlags={featureFlags} />
      <AlertDialog />
    </Flex>
  )
}

export { PharmacyView }
