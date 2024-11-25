import { Flex } from '@radix-ui/themes'
import { SCRIPTSURE_BASE_APPLICATION_URL } from '@/constants'
import { PharmacyWidget } from './pharmacy-widget'

interface PharmacyViewProps {
  patientId: string
}

const PharmacyView = ({ patientId }: PharmacyViewProps) => {
  return (
    <Flex direction="column" width="100%" gap="1">
      <PharmacyWidget
        patientId={patientId}
        scriptSureAppUrl={SCRIPTSURE_BASE_APPLICATION_URL}
      />
    </Flex>
  )
}

export { PharmacyView }
