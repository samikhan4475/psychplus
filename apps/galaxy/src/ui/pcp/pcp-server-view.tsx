import { Flex } from '@radix-ui/themes'
import { PcpView } from './pcp-view'
import { fetchExternalProviderWithPatientAction } from './pcp-view/actions'
import { PcpViewProps } from './types'

const PcpServerView = async ({ patientId, googleApiKey }: PcpViewProps) => {
  const result = await fetchExternalProviderWithPatientAction(patientId)

  const lastObject =
    result.state === 'success' && result.data?.length
      ? result.data[result.data.length - 1]
      : undefined

  return (
    <Flex direction="column" width="100%" gap="2">
      <PcpView
        patientId={patientId}
        googleApiKey={googleApiKey}
        initialValue={lastObject?.externalProvider}
      />
    </Flex>
  )
}

export { PcpServerView }
