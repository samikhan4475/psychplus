import { Flex } from '@radix-ui/themes'
import { PreEmploymentEvalWidget } from './widget'
interface Props {
  patientId: string
  isHeader?: boolean
}
const PreEmploymentEvalView = ({ patientId, isHeader }: Props) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PreEmploymentEvalWidget patientId={patientId} isHeader={isHeader} />
      </Flex>
    </Flex>
  )
}
export { PreEmploymentEvalView }