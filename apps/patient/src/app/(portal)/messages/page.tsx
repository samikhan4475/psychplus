import { getCareTeam } from '@/features/care-team/api'
import MessagesView from '@/features/messages/ui/messages-view'

const MessagesPage = async () => {
  const response = await getCareTeam()

  if (response.state === 'error') {
    return <div>{response.error}</div>
  }

  return <MessagesView careTeam={response.data.careTeam} />
}

export default MessagesPage
