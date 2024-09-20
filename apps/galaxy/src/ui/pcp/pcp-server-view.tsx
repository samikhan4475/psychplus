import { Flex } from '@radix-ui/themes'
import { PcpView } from './pcp-view'
import { PcpViewProps } from './types'

const PcpServerView = ({ patientId, googleApiKey }: PcpViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PcpView patientId={patientId} googleApiKey={googleApiKey} />
      </Flex>
    </Flex>
  )
}

export { PcpServerView }
