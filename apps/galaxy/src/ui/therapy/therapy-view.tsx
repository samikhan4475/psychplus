import { Flex } from '@radix-ui/themes'
import { TherapyWidget } from './therapy-widget/therapy-widget'

interface TherapyViewProps {
  patientId: string
}

const TherapyView = ({ patientId }: TherapyViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <TherapyWidget patientId={patientId} />
    </Flex>
  )
}

export { TherapyView }
