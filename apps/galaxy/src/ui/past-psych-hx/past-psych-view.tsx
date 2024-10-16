import { Flex } from '@radix-ui/themes'
import { PastPsychHxWidget } from './past-psych-hx-widget'

interface PastPsychViewProps {
  patientId: string
}

const PastPsychHxView = ({ patientId }: PastPsychViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PastPsychHxWidget patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { PastPsychHxView }
