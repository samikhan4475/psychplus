import { CodeSetPreloader, getCodeSets } from '@psychplus/codeset'
import { getUser, UserPreloader } from '@psychplus/user'
import { FeeSchedulesWidgetClient } from './fee-schedules-widget.client'
import { useStore } from './store'

const FeeSchedulesWidgetServer = async () => {
  const [user, codeSets] = await Promise.all([getUser(), getCodeSets()])

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <CodeSetPreloader codeSets={codeSets} store={[useStore]} />
      <FeeSchedulesWidgetClient />
    </>
  )
}

export { FeeSchedulesWidgetServer }
