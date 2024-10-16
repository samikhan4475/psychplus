import { Flex } from '@radix-ui/themes'
import { PhysicalExamWidget } from './physical-exam-widget'

interface PhysicalExamViewProps {
  patientId: string
}

const PhysicalExamView = ({ patientId }: PhysicalExamViewProps) => {
  return (
    <Flex direction="column" gap="2" width="100%">
      <PhysicalExamWidget patientId={patientId} />
    </Flex>
  )
}

export { PhysicalExamView }
