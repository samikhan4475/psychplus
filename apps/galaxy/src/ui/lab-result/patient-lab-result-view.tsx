import { Flex } from '@radix-ui/themes'
import { LabResultWidget } from './patient-lab-result-widget'

const PatientLabResultView = () => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <LabResultWidget isQuickNoteView={false} />
      </Flex>
    </Flex>
  )
}

export { PatientLabResultView }
