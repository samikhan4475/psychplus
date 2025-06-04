import dynamic from 'next/dynamic'
import { Text } from '@radix-ui/themes'
import { getAcsInfo } from '@/ui/call/actions'

const CallView = dynamic(
  () => import('@/ui/call/call-view.tsx').then((mod) => mod.CallView),
  {
    ssr: false,
  },
)
const CallPage = async () => {
  const [acsResponse] = await Promise.all([getAcsInfo()])

  if (acsResponse.state === 'error') {
    return <Text>Error while getting ACS{acsResponse.error}</Text>
  }

  return <CallView acsInfo={acsResponse.data} />
}

export default CallPage
