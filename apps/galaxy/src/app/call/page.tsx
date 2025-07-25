import { Text } from '@radix-ui/themes'
import { getAcsInfo } from '@/ui/call/actions'
import { CallView } from '@/components/call-view-client'
const CallPage = async () => {
  const [acsResponse] = await Promise.all([getAcsInfo()])

  if (acsResponse.state === 'error') {
    return <Text>Error while getting ACS{acsResponse.error}</Text>
  }

  return <CallView acsInfo={acsResponse.data} />
}

export default CallPage
