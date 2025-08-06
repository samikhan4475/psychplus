import { Flex } from '@radix-ui/themes'
import { FitForDutyPsychEvalWidget } from './widget'
interface Props {
  patientId: string
  isHeader?: boolean
}
const FitForDutyPsychEvalView = ({ patientId, isHeader }: Props) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <FitForDutyPsychEvalWidget patientId={patientId} isHeader={isHeader} />
      </Flex>
    </Flex>
  )
}
export { FitForDutyPsychEvalView }