import { Flex } from '@radix-ui/themes'
import { AlertDialog } from './alert-dialog'
import { PharmacyWidget } from './pharmacy-widget'

interface PharmacyViewProps {
  patientId: string
}

const PharmacyView = ({ patientId }: PharmacyViewProps) => {
  return (
    <Flex direction="column" width="100%" gap="1">
      <PharmacyWidget patientId={patientId} />
      <AlertDialog />
    </Flex>
  )
}

export { PharmacyView }
