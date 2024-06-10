import { unstable_noStore as noStore } from 'next/cache'
import { FeeSchedulesWidgetClient } from './fee-schedules-widget.client'

const FeeSchedulesWidgetServer: React.FC = async () => {
  noStore()

  // const [user, codeSets] = await Promise.all([getUser(), getCodeSets()])

  return (
    <>
      {/* <UserPreloader user={user} store={[useStore]} /> */}
      {/* <CodeSetPreloader codeSets={codeSets} store={[useStore]} /> */}
      <FeeSchedulesWidgetClient />
    </>
  )
}

export { FeeSchedulesWidgetServer }
